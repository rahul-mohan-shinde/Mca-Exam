import request from 'supertest';
import app from '../../../src/app';
import { connectTestDatabase, disconnectTestDatabase, clearDatabase } from '../../helpers/test-helpers';
import { generateTestToken } from '../../helpers/test-helpers';
import User from '../../../src/modules/auth/model/user.model';
import Exam from '../../../src/modules/exam-management/model/exam.model';
import ExamAttempt from '../../../src/modules/student/model/exam-attempt.model';
import Question from '../../../src/modules/question-bank/model/question.model';
import Option from '../../../src/modules/question-bank/model/option.model';

describe('Student Exam Taking Flow', () => {
  let studentToken: string;
  let studentId: string;
  let examId: string;
  let questionId: string;

  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();

    // Create student user
    const student = await User.create({
      name: 'Test Student',
      email: 'student@test.com',
      password: 'hashedPassword',
      role_id: null,
    });
    studentId = student._id.toString();
    studentToken = generateTestToken(studentId, 'student');

    // Create exam
    const exam = await Exam.create({
      exam_name: 'Test Exam',
      duration: 60,
      total_marks: 100,
      passing_score: 50,
      start_time: new Date(),
      end_time: new Date(Date.now() + 3600000),
      status: 'ACTIVE',
      created_by: studentId,
    });
    examId = exam._id.toString();

    // Create question
    const question = await Question.create({
      question_text: 'What is 2+2?',
      question_type: 'MCQ',
      difficulty_level: 'EASY',
      marks: 5,
      created_by: studentId,
    });
    questionId = question._id.toString();

    // Create options
    await Option.create({
      question_id: questionId,
      option_text: '3',
      is_correct: false,
      order_number: 0,
    });
    await Option.create({
      question_id: questionId,
      option_text: '4',
      is_correct: true,
      order_number: 1,
    });
  });

  describe('POST /api/student/start-exam', () => {
    it('should start exam attempt successfully', async () => {
      // Act
      const response = await request(app)
        .post('/api/student/start-exam')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ examId });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.status).toBe('IN_PROGRESS');
    });

    it('should return 400 if exam not found', async () => {
      // Act
      const response = await request(app)
        .post('/api/student/start-exam')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ examId: 'invalid-id' });

      // Assert
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/student/save-answer', () => {
    it('should save answer successfully', async () => {
      // Arrange
      const attempt = await ExamAttempt.create({
        student_id: studentId,
        exam_id: examId,
        start_time: new Date(),
        status: 'IN_PROGRESS',
        total_marks: 100,
        marks_obtained: 0,
      });

      // Act
      const response = await request(app)
        .post('/api/student/save-answer')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          attemptId: attempt._id.toString(),
          questionId,
          answerData: { selected_option_id: questionId },
        });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('POST /api/student/submit-exam', () => {
    it('should submit exam and calculate result', async () => {
      // Arrange
      const attempt = await ExamAttempt.create({
        student_id: studentId,
        exam_id: examId,
        start_time: new Date(),
        status: 'IN_PROGRESS',
        total_marks: 100,
        marks_obtained: 0,
      });

      // Act
      const response = await request(app)
        .post('/api/student/submit-exam')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ attemptId: attempt._id.toString() });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('SUBMITTED');
    });
  });

  describe('GET /api/student/attempts', () => {
    it('should get student attempts', async () => {
      // Arrange
      await ExamAttempt.create({
        student_id: studentId,
        exam_id: examId,
        start_time: new Date(),
        status: 'SUBMITTED',
        total_marks: 100,
        marks_obtained: 75,
      });

      // Act
      const response = await request(app)
        .get('/api/student/attempts')
        .set('Authorization', `Bearer ${studentToken}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});

