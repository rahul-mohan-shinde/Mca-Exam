import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  category_name: string;
  parent_category_id?: mongoose.Types.ObjectId;
  description?: string;
  created_at: Date;
}

const categorySchema = new Schema<ICategory>({
  category_name: {
    type: String,
    required: true,
    unique: true
  },
  parent_category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
    index: true
  },
  description: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;

