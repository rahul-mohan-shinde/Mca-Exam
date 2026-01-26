import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  question_text: string;
  question_type: 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY';
  category_id: mongoose.Types.ObjectId;
  difficulty_level: 'EASY' | 'MEDIUM' | 'HARD';
  marks: number;
  created_by: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const questionSchema = new Schema<IQuestion>({
  question_text: {
    type: String,
    required: true
  },
  question_type: {
    type: String,
    enum: ['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY'],
    required: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true
  },
  difficulty_level: {
    type: String,
    enum: ['EASY', 'MEDIUM', 'HARD'],
    default: 'MEDIUM',
    index: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

questionSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const Question = mongoose.model<IQuestion>('Question', questionSchema);
export default Question;

