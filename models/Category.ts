import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Category document
export interface ICategory extends Document {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Category Schema
const CategorySchema: Schema<ICategory> = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
CategorySchema.index({ slug: 1 });
CategorySchema.index({ id: 1 });

// Export the model
const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
