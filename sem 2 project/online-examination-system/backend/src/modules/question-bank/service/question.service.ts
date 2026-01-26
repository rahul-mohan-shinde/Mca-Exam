import Question from '../model/question.model';
import Option from '../model/option.model';
import Category from '../model/category.model';

export class QuestionService {
  // Step 1: Create question
  async createQuestion(questionData: any, userId: string): Promise<any> {
    // Step 1.1: Create question
    const question = await Question.create({
      ...questionData,
      created_by: userId
    });

    // Step 1.2: Create options if MCQ
    if (questionData.question_type === 'MCQ' && questionData.options) {
      const options = questionData.options.map((opt: any, index: number) => ({
        question_id: question._id,
        option_text: opt.text,
        is_correct: opt.is_correct || false,
        order_number: index
      }));
      await Option.insertMany(options);
    }

    // Step 1.3: Return question with options
    const questionWithOptions = await Question.findById(question._id)
      .populate('category_id')
      .populate('created_by', 'name email');

    if (questionData.question_type === 'MCQ') {
      const options = await Option.find({ question_id: question._id });
      return { ...questionWithOptions.toObject(), options };
    }

    return questionWithOptions;
  }

  // Step 2: Get all questions
  async getAllQuestions(filters: any = {}): Promise<any[]> {
    const query: any = {};
    
    if (filters.category_id) query.category_id = filters.category_id;
    if (filters.difficulty_level) query.difficulty_level = filters.difficulty_level;
    if (filters.question_type) query.question_type = filters.question_type;

    const questions = await Question.find(query)
      .populate('category_id')
      .populate('created_by', 'name email')
      .sort({ created_at: -1 });

    // Add options for MCQ questions
    for (const question of questions) {
      if (question.question_type === 'MCQ') {
        const options = await Option.find({ question_id: question._id });
        (question as any).options = options;
      }
    }

    return questions;
  }

  // Step 3: Get question by ID
  async getQuestionById(questionId: string): Promise<any> {
    const question = await Question.findById(questionId)
      .populate('category_id')
      .populate('created_by', 'name email');

    if (question && question.question_type === 'MCQ') {
      const options = await Option.find({ question_id: question._id });
      return { ...question.toObject(), options };
    }

    return question;
  }

  // Step 4: Update question
  async updateQuestion(questionId: string, updateData: any): Promise<any> {
    const question = await Question.findByIdAndUpdate(questionId, updateData, { new: true })
      .populate('category_id')
      .populate('created_by', 'name email');

    if (updateData.options && question && question.question_type === 'MCQ') {
      await Option.deleteMany({ question_id: questionId });
      const options = updateData.options.map((opt: any, index: number) => ({
        question_id: question._id,
        option_text: opt.text,
        is_correct: opt.is_correct || false,
        order_number: index
      }));
      await Option.insertMany(options);
    }

    return question;
  }

  // Step 5: Delete question
  async deleteQuestion(questionId: string): Promise<void> {
    await Question.findByIdAndDelete(questionId);
    await Option.deleteMany({ question_id: questionId });
  }

  // Step 6: Create category
  async createCategory(categoryData: any): Promise<any> {
    return await Category.create(categoryData);
  }

  // Step 7: Get all categories
  async getAllCategories(): Promise<any[]> {
    return await Category.find().sort({ category_name: 1 });
  }
}

export default new QuestionService();

