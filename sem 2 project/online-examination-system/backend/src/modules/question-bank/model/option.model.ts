import mongoose, { Document, Schema } from 'mongoose';

export interface IOption extends Document {
  question_id: mongoose.Types.ObjectId;
  option_text: string;
  is_correct: boolean;
  order_number: number;
}

const optionSchema = new Schema<IOption>({
  question_id: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
    index: true
  },
  option_text: {
    type: String,
    required: true
  },
  is_correct: {
    type: Boolean,
    default: false
  },
  order_number: {
    type: Number,
    default: 0
  }
});

const Option = mongoose.model<IOption>('Option', optionSchema);
export default Option;

