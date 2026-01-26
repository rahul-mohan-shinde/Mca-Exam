import { QuestionService } from '../../../src/modules/question-bank/service/question.service';
import Question from '../../../src/modules/question-bank/model/question.model';
import Option from '../../../src/modules/question-bank/model/option.model';

jest.mock('../../../src/modules/question-bank/model/question.model');
jest.mock('../../../src/modules/question-bank/model/option.model');

describe('QuestionService', () => {
  let questionService: QuestionService;

  beforeEach(() => {
    questionService = new QuestionService();
    jest.clearAllMocks();
  });

  describe('createQuestion', () => {
    it('should create question with MCQ options', async () => {
      // Arrange
      const questionData = {
        question_text: 'What is 2+2?',
        question_type: 'MCQ',
        difficulty_level: 'EASY',
        marks: 5,
        options: [
          { text: '3', is_correct: false },
          { text: '4', is_correct: true },
          { text: '5', is_correct: false },
        ],
      };
      const userId = 'user123';
      const mockQuestion = { _id: 'q123', ...questionData };

      (Question.create as jest.Mock).mockResolvedValue(mockQuestion);
      (Option.insertMany as jest.Mock).mockResolvedValue([]);

      // Act
      const result = await questionService.createQuestion(questionData, userId);

      // Assert
      expect(Question.create).toHaveBeenCalled();
      expect(Option.insertMany).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should create question without options for non-MCQ types', async () => {
      // Arrange
      const questionData = {
        question_text: 'Explain JavaScript',
        question_type: 'ESSAY',
        difficulty_level: 'HARD',
        marks: 10,
      };
      const userId = 'user123';

      (Question.create as jest.Mock).mockResolvedValue({ _id: 'q123', ...questionData });

      // Act
      const result = await questionService.createQuestion(questionData, userId);

      // Assert
      expect(Question.create).toHaveBeenCalled();
      expect(Option.insertMany).not.toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  describe('getAllQuestions', () => {
    it('should return all questions with filters', async () => {
      // Arrange
      const filters = { difficulty_level: 'EASY' };
      const mockQuestions = [
        { _id: 'q1', question_text: 'Question 1', difficulty_level: 'EASY' },
        { _id: 'q2', question_text: 'Question 2', difficulty_level: 'EASY' },
      ];

      (Question.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockQuestions),
          }),
        }),
      });

      // Act
      const result = await questionService.getAllQuestions(filters);

      // Assert
      expect(result).toEqual(mockQuestions);
    });
  });

  describe('updateQuestion', () => {
    it('should update question successfully', async () => {
      // Arrange
      const questionId = 'q123';
      const updateData = { question_text: 'Updated question' };

      (Question.findByIdAndUpdate as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue({ _id: questionId, ...updateData }),
        }),
      });

      // Act
      const result = await questionService.updateQuestion(questionId, updateData);

      // Assert
      expect(Question.findByIdAndUpdate).toHaveBeenCalledWith(questionId, updateData, { new: true });
      expect(result).toBeDefined();
    });
  });

  describe('deleteQuestion', () => {
    it('should delete question and its options', async () => {
      // Arrange
      const questionId = 'q123';

      (Question.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: questionId });
      (Option.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: 3 });

      // Act
      await questionService.deleteQuestion(questionId);

      // Assert
      expect(Question.findByIdAndDelete).toHaveBeenCalledWith(questionId);
      expect(Option.deleteMany).toHaveBeenCalledWith({ question_id: questionId });
    });
  });
});

