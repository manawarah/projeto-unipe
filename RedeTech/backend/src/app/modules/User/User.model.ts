import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  nome: { type: String, required: true },
  avatar: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
}, {
  timestamps: true,
});

export const User = model('User', userSchema);
