import mongoose, { Document, Schema } from 'mongoose';

export interface IExamAttempt extends Document {
  student_id: mongoose.Types.ObjectId;
  exam_id: mongoose.Types.ObjectId;
  start_time: Date;
  end_time?: Date;
  submitted_at?: Date;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'TIMEOUT' | 'CANCELLED';
  total_marks: number;
  marks_obtained: number;
  percentage?: number;
  grade?: string;
  is_passed: boolean;
  created_at: Date;
}

const examAttemptSchema = new Schema<IExamAttempt>({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  exam_id: {
    type: Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
    index: true
  },
  start_time: {
    type: Date,
    required: true,
    default: Date.now
  },
  end_time: {
    type: Date,
    default: null
  },
  submitted_at: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['IN_PROGRESS', 'SUBMITTED', 'TIMEOUT', 'CANCELLED'],
    default: 'IN_PROGRESS',
    index: true
  },
  total_marks: {
    type: Number,
    default: 0
  },
  marks_obtained: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  grade: {
    type: String,
    default: null
  },
  is_passed: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const ExamAttempt = mongoose.model<IExamAttempt>('ExamAttempt', examAttemptSchema);
export default ExamAttempt;

