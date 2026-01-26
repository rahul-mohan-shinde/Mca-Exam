import request from 'supertest';
import app from '../../../src/app';
import { connectTestDatabase, disconnectTestDatabase, clearDatabase } from '../../helpers/test-helpers';
import User from '../../../src/modules/auth/model/user.model';
import { PasswordService } from '../../../src/modules/auth/service/password.service';

describe('POST /api/auth/login', () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('should login user with valid credentials', async () => {
    // Arrange
    const passwordService = new PasswordService();
    const hashedPassword = await passwordService.hashPassword('Test@123');
    
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role_id: null,
    });

    // Act
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Test@123',
      });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should return 401 for invalid email', async () => {
    // Act
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'invalid@example.com',
        password: 'Test@123',
      });

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 for invalid password', async () => {
    // Arrange
    const passwordService = new PasswordService();
    const hashedPassword = await passwordService.hashPassword('Test@123');
    
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role_id: null,
    });

    // Act
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword',
      });

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should return 400 for missing email', async () => {
    // Act
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        password: 'Test@123',
      });

    // Assert
    expect(response.status).toBe(400);
  });

  it('should return 400 for missing password', async () => {
    // Act
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
      });

    // Assert
    expect(response.status).toBe(400);
  });
});

