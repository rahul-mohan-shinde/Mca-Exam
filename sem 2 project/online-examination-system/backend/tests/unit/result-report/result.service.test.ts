import { ResultService } from '../../../src/modules/result-report/service/result.service';
import ExamAttempt from '../../../src/modules/student/model/exam-attempt.model';
import Answer from '../../../src/modules/student/model/answer.model';

jest.mock('../../../src/modules/student/model/exam-attempt.model');
jest.mock('../../../src/modules/student/model/answer.model');

describe('ResultService', () => {
  let resultService: ResultService;

  beforeEach(() => {
    resultService = new ResultService();
    jest.clearAllMocks();
  });

  describe('calculateResult', () => {
    it('should calculate result correctly', async () => {
      // Arrange
      const attemptId = 'attempt123';
      const mockAnswers = [
        { marks_obtained: 5 },
        { marks_obtained: 10 },
        { marks_obtained: 5 },
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
      const result = await resultService.calculateResult(attemptId);

      // Assert
      expect(mockAttempt.marks_obtained).toBe(20);
      expect(mockAttempt.percentage).toBe(20);
      expect(mockAttempt.is_passed).toBe(false);
      expect(mockAttempt.grade).toBe('F');
      expect(mockAttempt.save).toHaveBeenCalled();
    });

    it('should assign correct grade based on percentage', async () => {
      // Arrange
      const attemptId = 'attempt123';
      const mockAnswers = [{ marks_obtained: 90 }];
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
      await resultService.calculateResult(attemptId);

      // Assert
      expect(mockAttempt.grade).toBe('A+');
      expect(mockAttempt.is_passed).toBe(true);
    });
  });

  describe('getResult', () => {
    it('should return result with answers', async () => {
      // Arrange
      const attemptId = 'attempt123';
      const mockAttempt = {
        _id: attemptId,
        marks_obtained: 75,
        percentage: 75,
        grade: 'B',
        is_passed: true,
      };
      const mockAnswers = [
        { question_id: 'q1', marks_obtained: 5, is_correct: true },
        { question_id: 'q2', marks_obtained: 10, is_correct: true },
      ];

      (ExamAttempt.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockAttempt),
      });
      (Answer.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockAnswers),
      });

      // Act
      const result = await resultService.getResult(attemptId);

      // Assert
      expect(result).toBeDefined();
      expect(result.attempt).toBeDefined();
      expect(result.answers).toBeDefined();
    });
  });

  describe('getAnalytics', () => {
    it('should return analytics for exam', async () => {
      // Arrange
      const examId = 'exam123';
      const mockAttempts = [
        { marks_obtained: 80, percentage: 80 },
        { marks_obtained: 60, percentage: 60 },
        { marks_obtained: 90, percentage: 90 },
      ];

      (ExamAttempt.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockAttempts),
      });

      // Act
      const result = await resultService.getAnalytics(examId);

      // Assert
      expect(result).toBeDefined();
      expect(result.averageScore).toBeDefined();
      expect(result.totalAttempts).toBe(3);
    });
  });
});

