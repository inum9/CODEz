import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { submit } from "../model/ubmission.model.js";
import { prob } from "../model/problem.js";



// Mock function to "evaluate" code submissions
const evaluateCode = (code, language, problemExamples) => {
  // For simplicity, we'll simulate result processing
  // In a real system, you would use a secure sandbox environment to run user code
  const isCorrect = Math.random() > 0.5; // Randomly simulate success or failure
  return {
    status: isCorrect ? 'accepted' : 'wrong answer',
    executionTime: Math.floor(Math.random() * 1000), // Simulated execution time
  };
};

// Submit a solution
const submitSolution = asyncHandler(async (req, res) => {
    try {
      const { userId } = req.body; // This should come from an authenticated user
      const { problemId, code, language } = req.body;
  
      // Find the problem
      const problem = await prob.findById(problemId);
      if (!problem) return res.status(404).json({ message: 'Problem not found' });
  
      // Evaluate the code (mocked for now)
      const { status, executionTime } = evaluateCode(code, language, problem.examples);
  
      // Create a submission record
      const submission = await submit.create({
        user: userId,
        problem: problemId,
        code,
        language,
        status,
        executionTime,
      });
  
      res.status(201).json({ message: 'Submission evaluated', submission });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// Get all submissions for a user
exports.getUserSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;

    const submissions = await Submission.find({ user: userId }).populate('problem', 'title');
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
 export {submitSolution};