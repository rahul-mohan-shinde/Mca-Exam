import mongoose, { Document, Schema } from 'mongoose';

export interface IExamQuestion extends Document {
  exam_id: mongoose.Types.ObjectId;
  question_id: mongoose.Types.ObjectId;
  order_number: number;
}

const examQuestionSchema = new Schema<IExamQuestion>({
  exam_id: {
    type: Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
    index: true
  },
  question_id: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  order_number: {
    type: Number,
    required: true
  }
});

examQuestionSchema.index({ exam_id: 1, question_id: 1 }, { unique: true });

const ExamQuestion = mongoose.model<IExamQuestion>('ExamQuestion', examQuestionSchema);
export default ExamQuestion;

