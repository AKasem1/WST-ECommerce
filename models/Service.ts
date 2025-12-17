import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Service document
export interface IService extends Document {
  id: number;
  name: string;
  image: string;
  slug: string;
}

// Service Schema
const ServiceSchema: Schema<IService> = new Schema(
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
    image: {
      type: String,
      required: true,
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
ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ id: 1 });

// Export the model
const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
