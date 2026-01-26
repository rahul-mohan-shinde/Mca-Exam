import { LoginDTO, LoginResponseDTO } from '../dto/login.dto';
import { RegisterDTO, RegisterResponseDTO } from '../dto/register.dto';
import authRepository from '../repository/auth.repository';
import passwordService from './password.service';
import tokenService from './token.service';
import crypto from 'crypto';

export class AuthService {
  // Step 1: Authenticate user (Login)
  async authenticate(loginData: LoginDTO): Promise<LoginResponseDTO> {
    // Step 1.1: Validate input
    if (!loginData.email || !loginData.password) {
      throw new Error('Email and password are required');
    }

    // Step 1.2: Find user by email
    const user = await authRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Step 1.3: Verify password
    const isPasswordValid = await passwordService.comparePassword(
      loginData.password,
      user.password_hash
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Step 1.4: Check user status
    if (!user.is_verified) {
      throw new Error('Please verify your email address');
    }

    if (!user.is_active) {
      throw new Error('Account is deactivated');
    }

    // Step 1.5: Generate tokens
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: (user.role_id as any)?.role_name || 'student'
    };

    const token = tokenService.generateAccessToken(tokenPayload);
    const refreshToken = tokenService.generateRefreshToken(user._id.toString());

    // Step 1.6: Create session
    await authRepository.createSession({
      user_id: user._id.toString(),
      token,
      refresh_token: refreshToken,
      expires_at: new Date(Date.now() + tokenService.getTokenExpirationTime() * 1000),
      ip_address: '',
      user_agent: ''
    });

    // Step 1.7: Return response
    return {
      success: true,
      token,
      refreshToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: (user.role_id as any)?.role_name || 'student'
      },
      expiresIn: tokenService.getTokenExpirationTime()
    };
  }

  // Step 2: Register new user
  async register(registerData: RegisterDTO): Promise<RegisterResponseDTO> {
    // Step 2.1: Validate input
    if (!registerData.name || !registerData.email || !registerData.password) {
      throw new Error('Name, email, and password are required');
    }

    if (registerData.password !== registerData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Step 2.2: Validate password strength
    const passwordValidation = passwordService.validatePasswordStrength(registerData.password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }

    // Step 2.3: Check if email already exists
    const existingUser = await authRepository.findByEmail(registerData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Step 2.4: Get default role
    const defaultRole = await authRepository.getDefaultRole();

    // Step 2.5: Hash password
    const passwordHash = await passwordService.hashPassword(registerData.password);

    // Step 2.6: Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Step 2.7: Create user
    const user = await authRepository.createUser({
      name: registerData.name,
      email: registerData.email,
      password_hash: passwordHash,
      role_id: defaultRole._id.toString(),
      verification_token: verificationToken
    });

    // Step 2.8: Return response
    return {
      success: true,
      message: 'Registration successful. Please verify your email.',
      userId: user._id.toString()
    };
  }

  // Step 3: Forgot password
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    // Step 3.1: Find user
    const user = await authRepository.findByEmail(email);
    
    // Step 3.2: Generate reset token (even if user doesn't exist - security)
    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
      
      await authRepository.updateUser(user._id.toString(), {
        reset_token: resetTokenHash,
        reset_token_expires: new Date(Date.now() + 3600000) // 1 hour
      });
      
      // TODO: Send email with reset token
      // emailService.sendPasswordResetEmail(user.email, resetToken);
    }

    return {
      success: true,
      message: 'If email exists, reset link has been sent'
    };
  }

  // Step 4: Reset password
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    // Step 4.1: Hash provided token
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Step 4.2: Find user by reset token
    const user = await authRepository.findByResetToken(tokenHash);
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    // Step 4.3: Validate password strength
    const passwordValidation = passwordService.validatePasswordStrength(newPassword);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }

    // Step 4.4: Hash new password
    const passwordHash = await passwordService.hashPassword(newPassword);

    // Step 4.5: Update password and clear reset token
    await authRepository.updateUser(user._id.toString(), {
      password_hash: passwordHash,
      reset_token: undefined,
      reset_token_expires: undefined
    });

    // Step 4.6: Invalidate all sessions
    await authRepository.deleteAllUserSessions(user._id.toString());

    return {
      success: true,
      message: 'Password reset successful'
    };
  }
}

export default new AuthService();

