import request from 'supertest';
import app from '../../../src/app';
import { connectTestDatabase, disconnectTestDatabase, clearDatabase } from '../../helpers/test-helpers';
import { generateTestToken } from '../../helpers/test-helpers';
import User from '../../../src/modules/auth/model/user.model';
import Exam from '../../../src/modules/exam-management/model/exam.model';

describe('Exam Management CRUD Operations', () => {
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
    
    const user = await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'hashedPassword',
      role_id: null,
    });
    userId = user._id.toString();
    authToken = generateTestToken(userId, 'admin');
  });

  describe('POST /api/exams/exams', () => {
    it('should create exam successfully', async () => {
      // Act
      const response = await request(app)
        .post('/api/exams/exams')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          exam_name: 'Math Test',
          description: 'Mathematics Examination',
          duration: 60,
          total_marks: 100,
          passing_score: 50,
          start_time: new Date(),
          end_time: new Date(Date.now() + 3600000),
          status: 'ACTIVE',
        });

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.exam_name).toBe('Math Test');
    });
  });

  describe('GET /api/exams/exams', () => {
    it('should get all exams', async () => {
      // Arrange
      await Exam.create({
        exam_name: 'Test Exam',
        duration: 60,
        total_marks: 100,
        passing_score: 50,
        created_by: userId,
      });

      // Act
      const response = await request(app)
        .get('/api/exams/exams')
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/exams/exams/:id', () => {
    it('should update exam successfully', async () => {
      // Arrange
      const exam = await Exam.create({
        exam_name: 'Original Exam',
        duration: 60,
        total_marks: 100,
        passing_score: 50,
        created_by: userId,
      });

      // Act
      const response = await request(app)
        .put(`/api/exams/exams/${exam._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          exam_name: 'Updated Exam',
        });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.exam_name).toBe('Updated Exam');
    });
  });

  describe('DELETE /api/exams/exams/:id', () => {
    it('should delete exam successfully', async () => {
      // Arrange
      const exam = await Exam.create({
        exam_name: 'Exam to Delete',
        duration: 60,
        total_marks: 100,
        passing_score: 50,
        created_by: userId,
      });

      // Act
      const response = await request(app)
        .delete(`/api/exams/exams/${exam._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const deletedExam = await Exam.findById(exam._id);
      expect(deletedExam).toBeNull();
    });
  });
});

