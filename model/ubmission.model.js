import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: "problem", required: true },
  code: { type: String, required: true },
  language: { type: String, required: true }, // e.g., 'javascript', 'python'
  status: { type: String, enum: ['accepted', 'wrong answer', 'runtime error', 'compilation error'], required: true },
  executionTime: { type: Number }, // in milliseconds
}, { timestamps: true });

const submit =mongoose .connect("submit",submissionSchema);
export {submit};
