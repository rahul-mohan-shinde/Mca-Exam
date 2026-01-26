import ExamAttempt from '../../student/model/exam-attempt.model';
import Answer from '../../student/model/answer.model';

export class ResultService {
  // Step 1: Calculate result for attempt
  async calculateResult(attemptId: string): Promise<any> {
    const attempt = await ExamAttempt.findById(attemptId).populate('exam_id');
    if (!attempt) {
      throw new Error('Attempt not found');
    }

    const answers = await Answer.find({ attempt_id: attemptId });
    const totalMarksObtained = answers.reduce((sum, answer) => sum + answer.marks_obtained, 0);

    const exam = attempt.exam_id as any;
    const percentage = exam.total_marks > 0 ? (totalMarksObtained / exam.total_marks) * 100 : 0;
    const isPassed = percentage >= exam.passing_score;

    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    attempt.marks_obtained = totalMarksObtained;
    attempt.percentage = percentage;
    attempt.grade = grade;
    attempt.is_passed = isPassed;

    await attempt.save();

    return attempt;
  }

  // Step 2: Get result by attempt ID
  async getResult(attemptId: string): Promise<any> {
    const attempt = await ExamAttempt.findById(attemptId)
      .populate('exam_id')
      .populate('student_id', 'name email');

    if (!attempt) {
      throw new Error('Attempt not found');
    }

    const answers = await Answer.find({ attempt_id: attemptId })
      .populate('question_id');

    return {
      attempt,
      answers
    };
  }

  // Step 3: Get analytics
  async getAnalytics(examId?: string): Promise<any> {
    const query: any = { status: 'SUBMITTED' };
    if (examId) query.exam_id = examId;

    const attempts = await ExamAttempt.find(query);
    
    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        passRate: 0,
        gradeDistribution: {}
      };
    }

    const totalMarks = attempts.reduce((sum, attempt) => sum + attempt.marks_obtained, 0);
    const averageScore = totalMarks / attempts.length;
    const passedAttempts = attempts.filter(attempt => attempt.is_passed).length;
    const passRate = (passedAttempts / attempts.length) * 100;

    const gradeDistribution: any = {};
    attempts.forEach(attempt => {
      const grade = attempt.grade || 'F';
      gradeDistribution[grade] = (gradeDistribution[grade] || 0) + 1;
    });

    return {
      totalAttempts: attempts.length,
      averageScore: Math.round(averageScore * 100) / 100,
      passRate: Math.round(passRate * 100) / 100,
      gradeDistribution
    };
  }
}

export default new ResultService();

