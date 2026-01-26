import User from '../../auth/model/user.model';
import Exam from '../../exam-management/model/exam.model';
import ExamAttempt from '../../student/model/exam-attempt.model';
import Question from '../../question-bank/model/question.model';

export class AdminService {
  // Step 1: Get dashboard statistics
  async getStatistics(): Promise<any> {
    // Step 1.1: Get user statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ is_active: true });
    const verifiedUsers = await User.countDocuments({ is_verified: true });

    // Step 1.2: Get exam statistics
    const totalExams = await Exam.countDocuments();
    const activeExams = await Exam.countDocuments({ status: 'ACTIVE' });
    const completedExams = await Exam.countDocuments({ status: 'COMPLETED' });

    // Step 1.3: Get attempt statistics
    const totalAttempts = await ExamAttempt.countDocuments();
    const completedAttempts = await ExamAttempt.countDocuments({ status: 'SUBMITTED' });

    // Step 1.4: Get question statistics
    const totalQuestions = await Question.countDocuments();

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        verified: verifiedUsers
      },
      exams: {
        total: totalExams,
        active: activeExams,
        completed: completedExams
      },
      attempts: {
        total: totalAttempts,
        completed: completedAttempts
      },
      questions: {
        total: totalQuestions
      }
    };
  }

  // Step 2: Get recent activities
  async getRecentActivities(limit: number = 10): Promise<any[]> {
    // This would typically come from AdminAction model
    // For now, return empty array
    return [];
  }

  // Step 3: Get performance metrics
  async getPerformanceMetrics(): Promise<any> {
    const attempts = await ExamAttempt.find({ status: 'SUBMITTED' });
    
    if (attempts.length === 0) {
      return {
        averageScore: 0,
        passRate: 0,
        totalAttempts: 0
      };
    }

    const totalMarks = attempts.reduce((sum, attempt) => sum + attempt.marks_obtained, 0);
    const averageScore = totalMarks / attempts.length;
    const passedAttempts = attempts.filter(attempt => attempt.is_passed).length;
    const passRate = (passedAttempts / attempts.length) * 100;

    return {
      averageScore: Math.round(averageScore * 100) / 100,
      passRate: Math.round(passRate * 100) / 100,
      totalAttempts: attempts.length
    };
  }
}

export default new AdminService();

