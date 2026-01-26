import request from 'supertest';
import app from '../../src/app';
import { connectTestDatabase, disconnectTestDatabase, clearDatabase } from '../helpers/test-helpers';
import { PasswordService } from '../../src/modules/auth/service/password.service';
import User from '../../src/modules/auth/model/user.model';
import Question from '../../src/modules/question-bank/model/question.model';
import Exam from '../../src/modules/exam-management/model/exam.model';

describe('E2E: Complete Admin Flow', () => {
  let adminToken: string;
  let adminId: string;

  beforeAll(async () => {
    await connectTestDatabase();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();

    // Create admin
    const passwordService = new PasswordService();
    const hashedPassword = await passwordService.hashPassword('Admin@123');
    const admin = await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      role_id: null,
    });
    adminId = admin._id.toString();

    // Login to get token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'Admin@123',
      });
    adminToken = loginResponse.body.token;
  });

  it('should complete full admin workflow', async () => {
    // Step 1: Get dashboard statistics
    const dashboardResponse = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(dashboardResponse.status).toBe(200);
    expect(dashboardResponse.body.success).toBe(true);
    expect(dashboardResponse.body.data.statistics).toBeDefined();

    // Step 2: Create question
    const createQuestionResponse = await request(app)
      .post('/api/questions/questions')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Admin Test Question',
        question_type: 'MCQ',
        difficulty_level: 'MEDIUM',
        marks: 10,
        options: [
          { text: 'Option 1', is_correct: false },
          { text: 'Option 2', is_correct: true },
        ],
      });

    expect(createQuestionResponse.status).toBe(201);
    expect(createQuestionResponse.body.success).toBe(true);
    const questionId = createQuestionResponse.body.data._id;

    // Step 3: Get all questions
    const questionsResponse = await request(app)
      .get('/api/questions/questions')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(questionsResponse.status).toBe(200);
    expect(questionsResponse.body.success).toBe(true);
    expect(questionsResponse.body.data.length).toBeGreaterThan(0);

    // Step 4: Create exam
    const createExamResponse = await request(app)
      .post('/api/exams/exams')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        exam_name: 'Admin Created Exam',
        description: 'Exam created by admin',
        duration: 60,
        total_marks: 100,
        passing_score: 50,
        start_time: new Date(),
        end_time: new Date(Date.now() + 3600000),
        status: 'ACTIVE',
      });

    expect(createExamResponse.status).toBe(201);
    expect(createExamResponse.body.success).toBe(true);
    const examId = createExamResponse.body.data._id;

    // Step 5: Generate question paper
    const generatePaperResponse = await request(app)
      .post('/api/exams/exams/generate-paper')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        examId,
        questionPool: [questionId],
        difficultyRatio: { easy: 0.3, medium: 0.5, hard: 0.2 },
      });

    expect(generatePaperResponse.status).toBe(200);
    expect(generatePaperResponse.body.success).toBe(true);

    // Step 6: Get all exams
    const examsResponse = await request(app)
      .get('/api/exams/exams')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(examsResponse.status).toBe(200);
    expect(examsResponse.body.success).toBe(true);
    expect(examsResponse.body.data.length).toBeGreaterThan(0);
  });
});

