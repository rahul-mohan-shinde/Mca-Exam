import request from 'supertest';
import app from '../../src/app';
import { connectTestDatabase, disconnectTestDatabase, clearDatabase } from '../helpers/test-helpers';
import { PasswordService } from '../../src/modules/auth/service/password.service';
import User from '../../src/modules/auth/model/user.model';
import Exam from '../../src/modules/exam-management/model/exam.model';
import Question from '../../src/modules/question-bank/model/question.model';
import Option from '../../src/modules/question-bank/model/option.model';

describe('E2E: Complete Student Flow', () => {
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

    // Create student
    const passwordService = new PasswordService();
    const hashedPassword = await passwordService.hashPassword('Test@123');
    const student = await User.create({
      name: 'Test Student',
      email: 'student@test.com',
      password: hashedPassword,
      role_id: null,
    });
    studentId = student._id.toString();

    // Login to get token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'student@test.com',
        password: 'Test@123',
      });
    studentToken = loginResponse.body.token;

    // Create exam
    const exam = await Exam.create({
      exam_name: 'E2E Test Exam',
      description: 'End-to-end test exam',
      duration: 30,
      total_marks: 50,
      passing_score: 25,
      start_time: new Date(),
      end_time: new Date(Date.now() + 3600000),
      status: 'ACTIVE',
      created_by: studentId,
    });
    examId = exam._id.toString();

    // Create question
    const question = await Question.create({
      question_text: 'E2E Test Question: What is 2+2?',
      question_type: 'MCQ',
      difficulty_level: 'EASY',
      marks: 10,
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

  it('should complete full student exam flow', async () => {
    // Step 1: Start exam
    const startResponse = await request(app)
      .post('/api/student/start-exam')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ examId });

    expect(startResponse.status).toBe(200);
    expect(startResponse.body.success).toBe(true);
    const attemptId = startResponse.body.data._id;

    // Step 2: Get exam questions
    const questionsResponse = await request(app)
      .get(`/api/student/exams/${examId}/questions`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(questionsResponse.status).toBe(200);
    expect(questionsResponse.body.success).toBe(true);
    expect(questionsResponse.body.data.length).toBeGreaterThan(0);

    // Step 3: Save answer
    const saveAnswerResponse = await request(app)
      .post('/api/student/save-answer')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        attemptId,
        questionId,
        answerData: { selected_option_id: questionId },
      });

    expect(saveAnswerResponse.status).toBe(200);
    expect(saveAnswerResponse.body.success).toBe(true);

    // Step 4: Submit exam
    const submitResponse = await request(app)
      .post('/api/student/submit-exam')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ attemptId });

    expect(submitResponse.status).toBe(200);
    expect(submitResponse.body.success).toBe(true);
    expect(submitResponse.body.data.status).toBe('SUBMITTED');
    expect(submitResponse.body.data.marks_obtained).toBeDefined();

    // Step 5: Get result
    const resultResponse = await request(app)
      .get(`/api/results/${attemptId}`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(resultResponse.status).toBe(200);
    expect(resultResponse.body.success).toBe(true);
    expect(resultResponse.body.data.attempt).toBeDefined();
    expect(resultResponse.body.data.answers).toBeDefined();

    // Step 6: Get student attempts
    const attemptsResponse = await request(app)
      .get('/api/student/attempts')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(attemptsResponse.status).toBe(200);
    expect(attemptsResponse.body.success).toBe(true);
    expect(attemptsResponse.body.data.length).toBeGreaterThan(0);
  });
});

