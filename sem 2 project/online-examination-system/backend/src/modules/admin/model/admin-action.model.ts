import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminAction extends Document {
  admin_id: mongoose.Types.ObjectId;
  action_type: string;
  target_id?: string;
  details: any;
  timestamp: Date;
}

const adminActionSchema = new Schema<IAdminAction>({
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  action_type: {
    type: String,
    required: true
  },
  target_id: {
    type: String,
    default: null
  },
  details: {
    type: Schema.Types.Mixed,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

const AdminAction = mongoose.model<IAdminAction>('AdminAction', adminActionSchema);
export default AdminAction;

