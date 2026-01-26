import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  role_name: string;
  permissions: string[];
  created_at: Date;
}

const roleSchema = new Schema<IRole>({
  role_name: {
    type: String,
    required: true,
    unique: true,
    enum: ['super_admin', 'admin', 'examiner', 'student']
  },
  permissions: {
    type: [String],
    default: []
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Role = mongoose.model<IRole>('Role', roleSchema);

export default Role;

