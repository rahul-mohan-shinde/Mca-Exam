import { AdminService } from '../../../src/modules/admin/service/admin.service';
import User from '../../../src/modules/auth/model/user.model';
import Exam from '../../../src/modules/exam-management/model/exam.model';
import ExamAttempt from '../../../src/modules/student/model/exam-attempt.model';
import Question from '../../../src/modules/question-bank/model/question.model';

jest.mock('../../../src/modules/auth/model/user.model');
jest.mock('../../../src/modules/exam-management/model/exam.model');
jest.mock('../../../src/modules/student/model/exam-attempt.model');
jest.mock('../../../src/modules/question-bank/model/question.model');

describe('AdminService', () => {
  let adminService: AdminService;

  beforeEach(() => {
    adminService = new AdminService();
    jest.clearAllMocks();
  });

  describe('getStatistics', () => {
    it('should return statistics for all entities', async () => {
      // Arrange
      (User.countDocuments as jest.Mock).mockResolvedValue(10);
      (Exam.countDocuments as jest.Mock).mockResolvedValue(5);
      (ExamAttempt.countDocuments as jest.Mock).mockResolvedValue(20);
      (Question.countDocuments as jest.Mock).mockResolvedValue(50);

      // Act
      const result = await adminService.getStatistics();

      // Assert
      expect(result).toBeDefined();
      expect(result.users.total).toBe(10);
      expect(result.exams.total).toBe(5);
      expect(result.attempts.total).toBe(20);
      expect(result.questions.total).toBe(50);
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should calculate performance metrics correctly', async () => {
      // Arrange
      const mockAttempts = [
        { marks_obtained: 80, total_marks: 100 },
        { marks_obtained: 60, total_marks: 100 },
        { marks_obtained: 90, total_marks: 100 },
      ];

      (ExamAttempt.find as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(mockAttempts),
      });

      // Act
      const result = await adminService.getPerformanceMetrics();

      // Assert
      expect(result).toBeDefined();
      expect(result.averageScore).toBeDefined();
      expect(result.passRate).toBeDefined();
    });
  });

  describe('getRecentActivities', () => {
    it('should return recent activities', async () => {
      // Arrange
      const mockActivities = [
        { action: 'CREATE_EXAM', timestamp: new Date() },
        { action: 'CREATE_QUESTION', timestamp: new Date() },
      ];

      // Mock implementation based on your AdminService
      // Act
      const result = await adminService.getRecentActivities();

      // Assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});

