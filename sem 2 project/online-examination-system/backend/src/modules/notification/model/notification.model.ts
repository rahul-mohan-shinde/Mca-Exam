import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  user_id: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'EMAIL' | 'IN_APP' | 'BOTH';
  is_read: boolean;
  sent_at?: Date;
  read_at?: Date;
  created_at: Date;
}

const notificationSchema = new Schema<INotification>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['EMAIL', 'IN_APP', 'BOTH'],
    default: 'IN_APP'
  },
  is_read: {
    type: Boolean,
    default: false,
    index: true
  },
  sent_at: {
    type: Date,
    default: null
  },
  read_at: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model<INotification>('Notification', notificationSchema);
export default Notification;

