import Exam from '../../exam-management/model/exam.model';
import ExamAttempt from '../model/exam-attempt.model';
import Answer from '../model/answer.model';
import ExamQuestion from '../../exam-management/model/exam-question.model';
import Question from '../../question-bank/model/question.model';
import Option from '../../question-bank/model/option.model';

export class StudentService {
  // Step 1: Start exam attempt
  async startExamAttempt(examId: string, studentId: string): Promise<any> {
    // Step 1.1: Check if exam exists and is active
    const exam = await Exam.findById(examId);
    if (!exam) {
      throw new Error('Exam not found');
    }

    if (exam.status !== 'ACTIVE') {
      throw new Error('Exam is not active');
    }

    // Step 1.2: Check if already attempted
    const existingAttempt = await ExamAttempt.findOne({
      exam_id: examId,
      student_id: studentId,
      status: { $in: ['IN_PROGRESS', 'SUBMITTED'] }
    });

    if (existingAttempt) {
      throw new Error('Exam already attempted');
    }

    // Step 1.3: Create attempt
    const attempt = await ExamAttempt.create({
      student_id: studentId,
      exam_id: examId,
      start_time: new Date(),
      status: 'IN_PROGRESS',
      total_marks: exam.total_marks,
      marks_obtained: 0
    });

    return attempt;
  }

  // Step 2: Get exam questions for student
  async getExamQuestions(examId: string): Promise<any[]> {
    const examQuestions = await ExamQuestion.find({ exam_id: examId })
      .sort({ order_number: 1 })
      .populate('question_id');

    const questions = await Promise.all(
      examQuestions.map(async (eq: any) => {
        const question = eq.question_id;
        if (question.question_type === 'MCQ') {
          const options = await Option.find({ question_id: question._id });
          return { ...question.toObject(), options };
        }
        return question;
      })
    );

    return questions;
  }

  // Step 3: Save answer
  async saveAnswer(attemptId: string, questionId: string, answerData: any): Promise<any> {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    let isCorrect = false;
    let marksObtained = 0;

    // Step 3.1: Check answer correctness
    if (question.question_type === 'MCQ') {
      const correctOption = await Option.findOne({
        question_id: questionId,
        is_correct: true
      });
      isCorrect = correctOption?._id.toString() === answerData.selected_option_id;
    } else if (question.question_type === 'TRUE_FALSE') {
      // Simple comparison for true/false
      isCorrect = answerData.answer_text === 'true' || answerData.answer_text === 'True';
    }

    if (isCorrect) {
      marksObtained = question.marks;
    }

    // Step 3.2: Save or update answer
    const existingAnswer = await Answer.findOne({ attempt_id: attemptId, question_id: questionId });
    
    if (existingAnswer) {
      existingAnswer.answer_text = answerData.answer_text;
      existingAnswer.selected_option_id = answerData.selected_option_id;
      existingAnswer.is_correct = isCorrect;
      existingAnswer.marks_obtained = marksObtained;
      await existingAnswer.save();
      return existingAnswer;
    } else {
      return await Answer.create({
        attempt_id: attemptId,
        question_id: questionId,
        answer_text: answerData.answer_text,
        selected_option_id: answerData.selected_option_id,
        is_correct: isCorrect,
        marks_obtained: marksObtained
      });
    }
  }

  // Step 4: Submit exam
  async submitExam(attemptId: string): Promise<any> {
    // Step 4.1: Get all answers
    const answers = await Answer.find({ attempt_id: attemptId });
    const totalMarksObtained = answers.reduce((sum, answer) => sum + answer.marks_obtained, 0);

    // Step 4.2: Get attempt and exam
    const attempt = await ExamAttempt.findById(attemptId).populate('exam_id');
    if (!attempt) {
      throw new Error('Attempt not found');
    }

    const exam = attempt.exam_id as any;
    const percentage = exam.total_marks > 0 ? (totalMarksObtained / exam.total_marks) * 100 : 0;
    const isPassed = percentage >= exam.passing_score;

    // Step 4.3: Determine grade
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    // Step 4.4: Update attempt
    attempt.marks_obtained = totalMarksObtained;
    attempt.percentage = percentage;
    attempt.grade = grade;
    attempt.is_passed = isPassed;
    attempt.status = 'SUBMITTED';
    attempt.submitted_at = new Date();
    attempt.end_time = new Date();

    await attempt.save();

    return attempt;
  }

  // Step 5: Get student attempts
  async getStudentAttempts(studentId: string): Promise<any[]> {
    return await ExamAttempt.find({ student_id: studentId })
      .populate('exam_id')
      .sort({ created_at: -1 });
  }
}

export default new StudentService();

