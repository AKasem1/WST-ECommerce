import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Inquiry document
export interface IInquiry extends Document {
  name: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Inquiry Schema
const InquirySchema: Schema<IInquiry> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
