import { StudentService } from '../../../src/modules/student/service/student.service';
import Exam from '../../../src/modules/exam-management/model/exam.model';
import ExamAttempt from '../../../src/modules/student/model/exam-attempt.model';
import Answer from '../../../src/modules/student/model/answer.model';
import Question from '../../../src/modules/question-bank/model/question.model';
import Option from '../../../src/modules/question-bank/model/option.model';

jest.mock('../../../src/modules/exam-management/model/exam.model');
jest.mock('../../../src/modules/student/model/exam-attempt.model');
jest.mock('../../../src/modules/student/model/answer.model');
jest.mock('../../../src/modules/question-bank/model/question.model');
jest.mock('../../../src/modules/question-bank/model/option.model');

describe('StudentService', () => {
  let studentService: StudentService;

  beforeEach(() => {
    studentService = new StudentService();
    jest.clearAllMocks();
  });

  describe('startExamAttempt', () => {
    it('should start exam attempt successfully', async () => {
      // Arrange
      const examId = 'exam123';
      const studentId = 'student123';
      const mockExam = {
        _id: examId,
        status: 'ACTIVE',
        total_marks: 100,
      };

      (Exam.findById as jest.Mock).mockResolvedValue(mockExam);
      (ExamAttempt.findOne as jest.Mock).mockResolvedValue(null);
      (ExamAttempt.create as jest.Mock).mockResolvedValue({
        _id: 'attempt123',
        student_id: studentId,
        exam_id: examId,
        status: 'IN_PROGRESS',
      });

      // Act
      const result = await studentService.startExamAttempt(examId, studentId);

      // Assert
      expect(Exam.findById).toHaveBeenCalledWith(examId);
      expect(ExamAttempt.create).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw error if exam not found', async () => {
      // Arrange
      (Exam.findById as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(studentService.startExamAttempt('invalid', 'student123')).rejects.toThrow('Exam not found');
    });

    it('should throw error if exam already attempted', async () => {
      // Arrange
      const mockExam = { _id: 'exam123', status: 'ACTIVE' };
      (Exam.findById as jest.Mock).mockResolvedValue(mockExam);
      (ExamAttempt.findOne as jest.Mock).mockResolvedValue({ _id: 'existingAttempt' });

      // Act & Assert
      await expect(studentService.startExamAttempt('exam123', 'student123')).rejects.toThrow('Exam already attempted');
    });
  });

  describe('saveAnswer', () => {
    it('should save MCQ answer correctly', async () => {
      // Arrange
      const attemptId = 'attempt123';
      const questionId = 'q123';
      const answerData = { selected_option_id: 'option123' };
      const mockQuestion = {
        _id: questionId,
        question_type: 'MCQ',
        marks: 5,
      };
      const mockCorrectOption = { _id: 'option123', is_correct: true };

      (Question.findById as jest.Mock).mockResolvedValue(mockQuestion);
      (Option.findOne as jest.Mock).mockResolvedValue(mockCorrectOption);
      (Answer.findOne as jest.Mock).mockResolvedValue(null);
      (Answer.create as jest.Mock).mockResolvedValue({
        _id: 'answer123',
        is_correct: true,
        marks_obtained: 5,
      });

      // Act
      const result = await studentService.saveAnswer(attemptId, questionId, answerData);

      // Assert
      expect(result.is_correct).toBe(true);
      expect(result.marks_obtained).toBe(5);
    });

    it('should update existing answer', async () => {
      // Arrange
      const attemptId = 'attempt123';
      const questionId = 'q123';
      const answerData = { selected_option_id: 'option456' };
      const mockExistingAnswer = {
        _id: 'answer123',
        save: jest.fn().mockResolvedValue(true),
      };

      (Question.findById as jest.Mock).mockResolvedValue({ _id: questionId, question_type: 'MCQ', marks: 5 });
      (Option.findOne as jest.Mock).mockResolvedValue({ _id: 'option456', is_correct: true });
      (Answer.findOne as jest.Mock).mockResolvedValue(mockExistingAnswer);

      // Act
      await studentService.saveAnswer(attemptId, questionId, answerData);

      // Assert
      expect(mockExistingAnswer.save).toHaveBeenCalled();
    });
  });

  describe('submitExam', () => {
    it('should submit exam and calculate result', async () => {
      // Arrange
      const attemptId = 'attempt123';
      const mockAnswers = [
        { marks_obtained: 5 },
        { marks_obtained: 10 },
        { marks_obtained: 0 },
      ];
      const mockAttempt = {
        _id: attemptId,
        exam_id: { total_marks: 100, passing_score: 50 },
        save: jest.fn().mockResolvedValue(true),
      };

      (Answer.find as jest.Mock).mockResolvedValue(mockAnswers);
      (ExamAttempt.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockAttempt),
      });

      // Act
      const result = await studentService.submitExam(attemptId);

      // Assert
      expect(mockAttempt.marks_obtained).toBe(15);
      expect(mockAttempt.status).toBe('SUBMITTED');
      expect(mockAttempt.save).toHaveBeenCalled();
    });
  });

  describe('getStudentAttempts', () => {
    it('should return all student attempts', async () => {
      // Arrange
      const studentId = 'student123';
      const mockAttempts = [
        { _id: 'attempt1', exam_id: { exam_name: 'Exam 1' } },
        { _id: 'attempt2', exam_id: { exam_name: 'Exam 2' } },
      ];

      (ExamAttempt.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(mockAttempts),
        }),
      });

      // Act
      const result = await studentService.getStudentAttempts(studentId);

      // Assert
      expect(result).toEqual(mockAttempts);
    });
  });
});

