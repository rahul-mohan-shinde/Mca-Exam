import request from 'supertest';
import app from '../../../src/app';
import { connectTestDatabase, disconnectTestDatabase, clearDatabase } from '../../helpers/test-helpers';
import User from '../../../src/modules/auth/model/user.model';

describe('POST /api/auth/register', () => {
  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('should register new user successfully', async () => {
    // Act
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'New User',
        email: 'newuser@example.com',
        password: 'Test@123',
        confirmPassword: 'Test@123',
      });

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe('newuser@example.com');

    // Verify user was created in database
    const user = await User.findOne({ email: 'newuser@example.com' });
    expect(user).toBeDefined();
    expect(user?.name).toBe('New User');
  });

  it('should return 400 if user already exists', async () => {
    // Arrange
    await User.create({
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'hashedPassword',
      role_id: null,
    });

    // Act
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'New User',
        email: 'existing@example.com',
        password: 'Test@123',
        confirmPassword: 'Test@123',
      });

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should return 400 if passwords do not match', async () => {
    // Act
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'New User',
        email: 'newuser@example.com',
        password: 'Test@123',
        confirmPassword: 'DifferentPassword',
      });

    // Assert
    expect(response.status).toBe(400);
  });

  it('should return 400 for missing required fields', async () => {
    // Act
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@example.com',
        // Missing name and password
      });

    // Assert
    expect(response.status).toBe(400);
  });
});

