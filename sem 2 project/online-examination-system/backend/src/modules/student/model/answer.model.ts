import mongoose, { Document, Schema } from 'mongoose';

export interface IAnswer extends Document {
  attempt_id: mongoose.Types.ObjectId;
  question_id: mongoose.Types.ObjectId;
  answer_text?: string;
  selected_option_id?: mongoose.Types.ObjectId;
  is_correct: boolean;
  marks_obtained: number;
  answered_at: Date;
}

const answerSchema = new Schema<IAnswer>({
  attempt_id: {
    type: Schema.Types.ObjectId,
    ref: 'ExamAttempt',
    required: true,
    index: true
  },
  question_id: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
    index: true
  },
  answer_text: {
    type: String,
    default: null
  },
  selected_option_id: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
    default: null
  },
  is_correct: {
    type: Boolean,
    default: false
  },
  marks_obtained: {
    type: Number,
    default: 0
  },
  answered_at: {
    type: Date,
    default: Date.now
  }
});

const Answer = mongoose.model<IAnswer>('Answer', answerSchema);
export default Answer;

