import Exam from '../model/exam.model';
import ExamQuestion from '../model/exam-question.model';
import Question from '../../question-bank/model/question.model';
import Option from '../../question-bank/model/option.model';

export class ExamService {
  // Step 1: Create exam
  async createExam(examData: any, userId: string): Promise<any> {
    const exam = await Exam.create({
      ...examData,
      created_by: userId
    });

    return exam;
  }

  // Step 2: Generate random question paper
  async generateQuestionPaper(
    examId: string,
    questionPool: string[],
    difficultyRatio: { easy: number; medium: number; hard: number } = { easy: 0.3, medium: 0.5, hard: 0.2 }
  ): Promise<any> {
    // Step 2.1: Filter questions by pool
    const questions = await Question.find({ _id: { $in: questionPool } });

    // Step 2.2: Categorize by difficulty
    const easyQuestions = questions.filter(q => q.difficulty_level === 'EASY');
    const mediumQuestions = questions.filter(q => q.difficulty_level === 'MEDIUM');
    const hardQuestions = questions.filter(q => q.difficulty_level === 'HARD');

    // Step 2.3: Apply weightage distribution
    const totalQuestions = questions.length;
    const easyCount = Math.floor(totalQuestions * difficultyRatio.easy);
    const mediumCount = Math.floor(totalQuestions * difficultyRatio.medium);
    const hardCount = totalQuestions - easyCount - mediumCount;

    // Step 2.4: Shuffle using Fisher-Yates algorithm
    const shuffle = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const selectedEasy = shuffle([...easyQuestions]).slice(0, easyCount);
    const selectedMedium = shuffle([...mediumQuestions]).slice(0, mediumCount);
    const selectedHard = shuffle([...hardQuestions]).slice(0, hardCount);

    const selectedQuestions = [...selectedEasy, ...selectedMedium, ...selectedHard];
    const shuffledFinal = shuffle(selectedQuestions);

    // Step 2.5: Save exam questions
    const examQuestions = shuffledFinal.map((q, index) => ({
      exam_id: examId,
      question_id: q._id,
      order_number: index + 1
    }));

    await ExamQuestion.insertMany(examQuestions);

    // Step 2.6: Return questions with options
    const questionsWithOptions = await Promise.all(
      shuffledFinal.map(async (q) => {
        const question = q.toObject();
        if (question.question_type === 'MCQ') {
          const options = await Option.find({ question_id: q._id });
          question.options = options;
        }
        return question;
      })
    );

    return questionsWithOptions;
  }

  // Step 3: Get all exams
  async getAllExams(filters: any = {}): Promise<any[]> {
    const query: any = {};
    if (filters.status) query.status = filters.status;

    return await Exam.find(query)
      .populate('created_by', 'name email')
      .sort({ created_at: -1 });
  }

  // Step 4: Get exam by ID
  async getExamById(examId: string): Promise<any> {
    return await Exam.findById(examId).populate('created_by', 'name email');
  }

  // Step 5: Get exam questions
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

  // Step 6: Update exam
  async updateExam(examId: string, updateData: any): Promise<any> {
    return await Exam.findByIdAndUpdate(examId, updateData, { new: true });
  }

  // Step 7: Delete exam
  async deleteExam(examId: string): Promise<void> {
    await Exam.findByIdAndDelete(examId);
    await ExamQuestion.deleteMany({ exam_id: examId });
  }
}

export default new ExamService();

