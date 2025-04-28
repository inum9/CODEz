import mongoose, { Schema } from "mongoose";    
const problemScehma=new Schema(
    
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
        tags: [{ type: String }],
        examples: [
          {
            input: { type: String, required: true },
            output: { type: String, required: true },
          },
        ],
    },
    {
        timestamps:true

    }
);

const prob= mongoose.model("problem",problemScehma);
export{prob};