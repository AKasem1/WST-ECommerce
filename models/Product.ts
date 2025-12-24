import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Product document
export interface IProduct extends Document {
  modelNumber: string;
  productImage: string;
  slug: string;
  productSpecs: string[];
  quantity: number;
  price: number;
  categoryId: mongoose.Schema.Types.ObjectId;
  visibility: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema
const ProductSchema: Schema<IProduct> = new Schema(
  {
    modelNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    productSpecs: {
      type: [String],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    visibility: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ProductSchema.index({ modelNumber: 1 });
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ price: 1 });

// Export the model
// Delete the model from cache if it exists to ensure schema updates are applied
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
