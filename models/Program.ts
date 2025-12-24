import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for subscription package
export interface ISubscriptionPackage {
  name: string;
  nameEn?: string;
  price: number;
  duration: number; // in months
  features: string[];
  isPopular?: boolean;
}

// Interface for system requirements
export interface ISystemRequirements {
  os: string[];
  processor?: string;
  ram?: string;
  storage?: string;
  additionalNotes?: string;
}

// Interface for Program document
export interface IProgram extends Document {
  name: string;
  nameEn?: string;
  slug: string;
  programImage: string;
  shortDescription: string;
  fullDescription: string;
  mainFeatures: string[];
  supportedActivities: string[];
  systemRequirements: ISystemRequirements;
  platforms: string[]; // e.g., ['Windows', 'Android', 'iOS']
  isFree: boolean;
  basePrice?: number; // if not free and has one-time payment
  hasSubscription: boolean;
  subscriptionPackages?: ISubscriptionPackage[];
  supportsOffline: boolean;
  categoryId: mongoose.Schema.Types.ObjectId;
  visibility: boolean;
  downloadLink?: string;
  demoLink?: string;
  documentationLink?: string;
  supportedLanguages: string[];
  version?: string;
  lastUpdated?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Subscription Package Schema
const SubscriptionPackageSchema = new Schema<ISubscriptionPackage>({
  name: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  features: {
    type: [String],
    required: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
});

// System Requirements Schema
const SystemRequirementsSchema = new Schema<ISystemRequirements>({
  os: {
    type: [String],
    required: true,
  },
  processor: String,
  ram: String,
  storage: String,
  additionalNotes: String,
});

// Program Schema
const ProgramSchema: Schema<IProgram> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameEn: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    programImage: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      maxlength: 500,
    },
    fullDescription: {
    },
    mainFeatures: {
      type: [String],
    },
    supportedActivities: {
      type: [String],
    },
    systemRequirements: {
      type: SystemRequirementsSchema,
    },
    platforms: {
      type: [String],
      required: true,
      enum: ['Windows', 'Android', 'iOS', 'macOS', 'Linux', 'Web'],
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    basePrice: {
      type: Number,
      min: 0,
    },
    hasSubscription: {
      type: Boolean,
      default: false,
    },
    subscriptionPackages: {
      type: [SubscriptionPackageSchema],
    },
    supportsOffline: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    downloadLink: {
      type: String,
    },
    demoLink: {
      type: String,
    },
    documentationLink: {
      type: String,
    },
    supportedLanguages: {
      type: [String],
      default: ['العربية'],
    },
    version: {
      type: String,
    },
    lastUpdated: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ProgramSchema.index({ slug: 1 });
ProgramSchema.index({ categoryId: 1 });
ProgramSchema.index({ isFree: 1 });
ProgramSchema.index({ platforms: 1 });
ProgramSchema.index({ visibility: 1 });

// Export the model
// Delete the model from cache if it exists to ensure schema updates are applied
if (mongoose.models.Program) {
  delete mongoose.models.Program;
}

const Program: Model<IProgram> = mongoose.model<IProgram>('Program', ProgramSchema);

export default Program;
