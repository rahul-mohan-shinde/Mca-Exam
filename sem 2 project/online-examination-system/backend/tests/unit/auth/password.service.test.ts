import { PasswordService } from '../../../src/modules/auth/service/password.service';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(() => {
    passwordService = new PasswordService();
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash password successfully', async () => {
      // Arrange
      const password = 'Test@123';
      const hashedPassword = 'hashedPassword123';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      // Act
      const result = await passwordService.hashPassword(password);

      // Assert
      expect(result).toBe(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });

    it('should handle hashing errors', async () => {
      // Arrange
      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'));

      // Act & Assert
      await expect(passwordService.hashPassword('password')).rejects.toThrow('Hashing failed');
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      // Arrange
      const password = 'Test@123';
      const hashedPassword = 'hashedPassword123';
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // Act
      const result = await passwordService.comparePassword(password, hashedPassword);

      // Assert
      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    });

    it('should return false for non-matching passwords', async () => {
      // Arrange
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act
      const result = await passwordService.comparePassword('wrongPassword', 'hashedPassword');

      // Assert
      expect(result).toBe(false);
    });
  });
});

