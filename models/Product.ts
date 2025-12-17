import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Product document
export interface IProduct extends Document {
  modelNumber: string;
  productImage: string;
  productDescription: string;
  quantity: number;
  msrpPrice: number;
  dppPrice: number;
  categoryId: mongoose.Schema.Types.ObjectId;
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
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    msrpPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    dppPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ProductSchema.index({ modelNumber: 1 });
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ msrpPrice: 1 });
ProductSchema.index({ dppPrice: 1 });

// Export the model
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
