import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  user_id: mongoose.Types.ObjectId;
  token: string;
  refresh_token?: string;
  expires_at: Date;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

const sessionSchema = new Schema<ISession>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  token: {
    type: String,
    required: true,
    index: true
  },
  refresh_token: {
    type: String,
    default: null
  },
  expires_at: {
    type: Date,
    required: true
  },
  ip_address: {
    type: String,
    default: null
  },
  user_agent: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Session = mongoose.model<ISession>('Session', sessionSchema);

export default Session;

