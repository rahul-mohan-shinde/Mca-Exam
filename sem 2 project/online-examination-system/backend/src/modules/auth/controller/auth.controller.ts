import { Request, Response, NextFunction } from 'express';
import authService from '../service/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';

export class AuthController {
  // Step 1: Login controller
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Step 1.1: Extract credentials from request body
      const loginData: LoginDTO = {
        email: req.body.email,
        password: req.body.password
      };

      // Step 1.2: Call authentication service
      const result = await authService.authenticate(loginData);

      // Step 1.3: Return success response
      res.status(200).json(result);
    } catch (error: any) {
      // Step 1.4: Handle errors
      if (error.message === 'Invalid credentials') {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      } else if (error.message === 'Please verify your email address') {
        res.status(403).json({
          success: false,
          message: error.message
        });
      } else if (error.message === 'Account is deactivated') {
        res.status(403).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message || 'Login failed'
        });
      }
    }
  }

  // Step 2: Register controller
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Step 2.1: Extract registration data
      const registerData: RegisterDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      };

      // Step 2.2: Call registration service
      const result = await authService.register(registerData);

      // Step 2.3: Return success response
      res.status(201).json(result);
    } catch (error: any) {
      // Step 2.4: Handle errors
      if (error.message === 'Email already registered') {
        res.status(409).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message || 'Registration failed'
        });
      }
    }
  }

  // Step 3: Forgot password controller
  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Step 3.1: Extract email
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          success: false,
          message: 'Email is required'
        });
        return;
      }

      // Step 3.2: Call forgot password service
      const result = await authService.forgotPassword(email);

      // Step 3.3: Return response
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to process request'
      });
    }
  }

  // Step 4: Reset password controller
  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Step 4.1: Extract token and new password
      const { token, password } = req.body;

      if (!token || !password) {
        res.status(400).json({
          success: false,
          message: 'Token and password are required'
        });
        return;
      }

      // Step 4.2: Call reset password service
      const result = await authService.resetPassword(token, password);

      // Step 4.3: Return response
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to reset password'
      });
    }
  }

  // Step 5: Logout controller
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Step 5.1: Extract token from header
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (token) {
        // Step 5.2: Delete session
        // await authRepository.deleteSession(token);
      }

      // Step 5.3: Return success
      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Logout failed'
      });
    }
  }
}

export default new AuthController();

