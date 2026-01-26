import { AuthService } from '../../../src/modules/auth/service/auth.service';
import { PasswordService } from '../../../src/modules/auth/service/password.service';
import { TokenService } from '../../../src/modules/auth/service/token.service';
import authRepository from '../../../src/modules/auth/repository/auth.repository';
import User from '../../../src/modules/auth/model/user.model';

jest.mock('../../../src/modules/auth/repository/auth.repository');
jest.mock('../../../src/modules/auth/service/password.service');
jest.mock('../../../src/modules/auth/service/token.service');

describe('AuthService', () => {
  let authService: AuthService;
  let mockPasswordService: jest.Mocked<PasswordService>;
  let mockTokenService: jest.Mocked<TokenService>;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService();
    mockPasswordService = PasswordService as any;
    mockTokenService = TokenService as any;
  });

  describe('loginService', () => {
    it('should login user with valid credentials', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'Test@123';
      const mockUser = {
        _id: 'user123',
        email,
        password: 'hashedPassword',
        name: 'Test User',
        role_id: { name: 'student' },
      };

      (authRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (mockPasswordService.comparePassword as jest.Mock).mockResolvedValue(true);
      (mockTokenService.generateToken as jest.Mock).mockReturnValue('test-token');
      (mockTokenService.generateRefreshToken as jest.Mock).mockReturnValue('refresh-token');

      // Act
      const result = await authService.loginService(email, password);

      // Assert
      expect(result).toBeDefined();
      expect(result.token).toBe('test-token');
      expect(authRepository.findUserByEmail).toHaveBeenCalledWith(email);
      expect(mockPasswordService.comparePassword).toHaveBeenCalledWith(password, 'hashedPassword');
    });

    it('should throw error for invalid email', async () => {
      // Arrange
      (authRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(authService.loginService('invalid@example.com', 'password')).rejects.toThrow('Invalid credentials');
    });

    it('should throw error for invalid password', async () => {
      // Arrange
      const mockUser = { _id: 'user123', email: 'test@example.com', password: 'hashedPassword' };
      (authRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (mockPasswordService.comparePassword as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(authService.loginService('test@example.com', 'wrongPassword')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('registerService', () => {
    it('should register new user successfully', async () => {
      // Arrange
      const userData = {
        name: 'New User',
        email: 'new@example.com',
        password: 'Test@123',
      };

      (authRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);
      (mockPasswordService.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (authRepository.createUser as jest.Mock).mockResolvedValue({ _id: 'user123', ...userData });

      // Act
      const result = await authService.registerService(userData);

      // Assert
      expect(result).toBeDefined();
      expect(authRepository.createUser).toHaveBeenCalled();
      expect(mockPasswordService.hashPassword).toHaveBeenCalledWith(userData.password);
    });

    it('should throw error if user already exists', async () => {
      // Arrange
      const userData = {
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'Test@123',
      };

      (authRepository.findUserByEmail as jest.Mock).mockResolvedValue({ _id: 'user123' });

      // Act & Assert
      await expect(authService.registerService(userData)).rejects.toThrow('User already exists');
    });
  });
});

