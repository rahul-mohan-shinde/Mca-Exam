import mongoose, { Document, Schema } from 'mongoose';

export interface IProctoringLog extends Document {
  attempt_id: mongoose.Types.ObjectId;
  event_type: string;
  event_data: any;
  is_violation: boolean;
  violation_type?: string;
  timestamp: Date;
}

const proctoringLogSchema = new Schema<IProctoringLog>({
  attempt_id: {
    type: Schema.Types.ObjectId,
    ref: 'ExamAttempt',
    required: true,
    index: true
  },
  event_type: {
    type: String,
    required: true
  },
  event_data: {
    type: Schema.Types.Mixed,
    default: {}
  },
  is_violation: {
    type: Boolean,
    default: false,
    index: true
  },
  violation_type: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

const ProctoringLog = mongoose.model<IProctoringLog>('ProctoringLog', proctoringLogSchema);
export default ProctoringLog;

