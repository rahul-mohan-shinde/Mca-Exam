import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

/**
 * Connect to in-memory MongoDB for testing
 */
export async function connectTestDatabase(): Promise<void> {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}

/**
 * Disconnect from test database
 */
export async function disconnectTestDatabase(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}

/**
 * Clear all collections
 */
export async function clearDatabase(): Promise<void> {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

/**
 * Create test user data
 */
export function createTestUser(overrides: any = {}) {
  return {
    name: 'Test User',
    email: 'test@example.com',
    password: 'Test@123',
    role_id: null,
    ...overrides,
  };
}

/**
 * Create test question data
 */
export function createTestQuestion(overrides: any = {}) {
  return {
    question_text: 'What is 2+2?',
    question_type: 'MCQ',
    difficulty_level: 'EASY',
    marks: 5,
    ...overrides,
  };
}

/**
 * Create test exam data
 */
export function createTestExam(overrides: any = {}) {
  return {
    exam_name: 'Test Exam',
    description: 'Test Description',
    duration: 60,
    total_marks: 100,
    passing_score: 50,
    start_time: new Date(),
    end_time: new Date(Date.now() + 3600000),
    status: 'ACTIVE',
    ...overrides,
  };
}

/**
 * Generate JWT token for testing
 */
export function generateTestToken(userId: string, role: string = 'student'): string {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
}

