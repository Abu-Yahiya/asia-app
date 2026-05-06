import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: string;
  category: string;
  date: Date;
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a blog title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    author: {
      type: String,
      required: [true, 'Please provide author name'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      type: String,
      default: '5 min',
    },
  },
  {
    timestamps: true,
  }
);

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
