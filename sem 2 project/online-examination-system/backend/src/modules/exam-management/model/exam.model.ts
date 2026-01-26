import mongoose, { Document, Schema } from 'mongoose';

export interface IExam extends Document {
  exam_name: string;
  description?: string;
  duration: number;
  total_marks: number;
  passing_score: number;
  start_time: Date;
  end_time: Date;
  status: 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  created_by: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const examSchema = new Schema<IExam>({
  exam_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  total_marks: {
    type: Number,
    required: true,
    min: 0
  },
  passing_score: {
    type: Number,
    required: true,
    min: 0
  },
  start_time: {
    type: Date,
    required: true,
    index: true
  },
  end_time: {
    type: Date,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['DRAFT', 'SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELLED'],
    default: 'DRAFT',
    index: true
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

examSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const Exam = mongoose.model<IExam>('Exam', examSchema);
export default Exam;

