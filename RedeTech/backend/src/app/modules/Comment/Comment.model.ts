import { Schema, model, Types } from 'mongoose';

const commentSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  post: { type: Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  liked: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export const Comment = model('Comment', commentSchema);
