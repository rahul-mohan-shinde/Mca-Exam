import request from 'supertest';
import app from '../../../src/app';
import { connectTestDatabase, disconnectTestDatabase, clearDatabase } from '../../helpers/test-helpers';
import { generateTestToken } from '../../helpers/test-helpers';
import Question from '../../../src/modules/question-bank/model/question.model';
import User from '../../../src/modules/auth/model/user.model';

describe('Question Bank CRUD Operations', () => {
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
    
    // Create test user
    const user = await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'hashedPassword',
      role_id: null,
    });
    userId = user._id.toString();
    authToken = generateTestToken(userId, 'admin');
  });

  describe('POST /api/questions/questions', () => {
    it('should create question successfully', async () => {
      // Act
      const response = await request(app)
        .post('/api/questions/questions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          question_text: 'What is 2+2?',
          question_type: 'MCQ',
          difficulty_level: 'EASY',
          marks: 5,
          options: [
            { text: '3', is_correct: false },
            { text: '4', is_correct: true },
            { text: '5', is_correct: false },
          ],
        });

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.question_text).toBe('What is 2+2?');
    });

    it('should return 401 without authentication', async () => {
      // Act
      const response = await request(app)
        .post('/api/questions/questions')
        .send({
          question_text: 'Test Question',
          question_type: 'MCQ',
        });

      // Assert
      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/questions/questions', () => {
    it('should get all questions', async () => {
      // Arrange
      await Question.create({
        question_text: 'Question 1',
        question_type: 'MCQ',
        difficulty_level: 'EASY',
        marks: 5,
        created_by: userId,
      });

      // Act
      const response = await request(app)
        .get('/api/questions/questions')
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/questions/questions/:id', () => {
    it('should update question successfully', async () => {
      // Arrange
      const question = await Question.create({
        question_text: 'Original Question',
        question_type: 'MCQ',
        difficulty_level: 'EASY',
        marks: 5,
        created_by: userId,
      });

      // Act
      const response = await request(app)
        .put(`/api/questions/questions/${question._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          question_text: 'Updated Question',
        });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.question_text).toBe('Updated Question');
    });
  });

  describe('DELETE /api/questions/questions/:id', () => {
    it('should delete question successfully', async () => {
      // Arrange
      const question = await Question.create({
        question_text: 'Question to Delete',
        question_type: 'MCQ',
        difficulty_level: 'EASY',
        marks: 5,
        created_by: userId,
      });

      // Act
      const response = await request(app)
        .delete(`/api/questions/questions/${question._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify question is deleted
      const deletedQuestion = await Question.findById(question._id);
      expect(deletedQuestion).toBeNull();
    });
  });
});

