import { ExamService } from '../../../src/modules/exam-management/service/exam.service';
import Exam from '../../../src/modules/exam-management/model/exam.model';
import ExamQuestion from '../../../src/modules/exam-management/model/exam-question.model';
import Question from '../../../src/modules/question-bank/model/question.model';

jest.mock('../../../src/modules/exam-management/model/exam.model');
jest.mock('../../../src/modules/exam-management/model/exam-question.model');
jest.mock('../../../src/modules/question-bank/model/question.model');

describe('ExamService', () => {
  let examService: ExamService;

  beforeEach(() => {
    examService = new ExamService();
    jest.clearAllMocks();
  });

  describe('createExam', () => {
    it('should create exam successfully', async () => {
      // Arrange
      const examData = {
        exam_name: 'Math Test',
        duration: 60,
        total_marks: 100,
        passing_score: 50,
      };
      const userId = 'user123';

      (Exam.create as jest.Mock).mockResolvedValue({ _id: 'exam123', ...examData, created_by: userId });

      // Act
      const result = await examService.createExam(examData, userId);

      // Assert
      expect(Exam.create).toHaveBeenCalledWith({ ...examData, created_by: userId });
      expect(result).toBeDefined();
    });
  });

  describe('generateQuestionPaper', () => {
    it('should generate random question paper with difficulty distribution', async () => {
      // Arrange
      const examId = 'exam123';
      const questionPool = ['q1', 'q2', 'q3', 'q4', 'q5'];
      const mockQuestions = [
        { _id: 'q1', difficulty_level: 'EASY' },
        { _id: 'q2', difficulty_level: 'EASY' },
        { _id: 'q3', difficulty_level: 'MEDIUM' },
        { _id: 'q4', difficulty_level: 'MEDIUM' },
        { _id: 'q5', difficulty_level: 'HARD' },
      ];

      (Question.find as jest.Mock).mockResolvedValue(mockQuestions);
      (ExamQuestion.insertMany as jest.Mock).mockResolvedValue([]);

      // Act
      const result = await examService.generateQuestionPaper(examId, questionPool);

      // Assert
      expect(Question.find).toHaveBeenCalled();
      expect(ExamQuestion.insertMany).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  describe('getAllExams', () => {
    it('should return all exams with filters', async () => {
      // Arrange
      const filters = { status: 'ACTIVE' };
      const mockExams = [
        { _id: 'exam1', exam_name: 'Exam 1', status: 'ACTIVE' },
        { _id: 'exam2', exam_name: 'Exam 2', status: 'ACTIVE' },
      ];

      (Exam.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(mockExams),
        }),
      });

      // Act
      const result = await examService.getAllExams(filters);

      // Assert
      expect(result).toEqual(mockExams);
    });
  });

  describe('updateExam', () => {
    it('should update exam successfully', async () => {
      // Arrange
      const examId = 'exam123';
      const updateData = { exam_name: 'Updated Exam' };

      (Exam.findByIdAndUpdate as jest.Mock).mockResolvedValue({ _id: examId, ...updateData });

      // Act
      const result = await examService.updateExam(examId, updateData);

      // Assert
      expect(Exam.findByIdAndUpdate).toHaveBeenCalledWith(examId, updateData, { new: true });
      expect(result).toBeDefined();
    });
  });

  describe('deleteExam', () => {
    it('should delete exam and its questions', async () => {
      // Arrange
      const examId = 'exam123';

      (Exam.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: examId });
      (ExamQuestion.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: 10 });

      // Act
      await examService.deleteExam(examId);

      // Assert
      expect(Exam.findByIdAndDelete).toHaveBeenCalledWith(examId);
      expect(ExamQuestion.deleteMany).toHaveBeenCalledWith({ exam_id: examId });
    });
  });
});

