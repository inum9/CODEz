import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prob } from "../model/problem.js";     
 const createProblem= asyncHandler(async(req,res)=>{
  try {
      const { title, description, difficulty, tags, examples }=req.body;
              const problemEg= await prob.create({title,description,examples,difficulty,tags});
              if(!prob){
                  throw new ApiError(402,"problem cannot created!");
              }
  
              return res.status(200).json(new ApiResponse(200,problemEg,"problem is created successfully !!"));
  } catch (error) {
console.log(`error in creating the problem ${error}`);

  }
 });


 // get all the problem 
 const getProblem =asyncHandler ( async(req,res)=>{
try {
                const getProb= await prob.find();
                if(!prob){
                    throw new ApiError(401,"connot get the provlem !1");
    
                }
                return res.json(new ApiResponse(200,getProb,"get the problemm succewssFully!"));
} catch (error) {
    console.log(`error ${error}`);
    
}
 });

 const getSingleProblem = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from request parameters
        console.log(`Fetching problem with ID: ${id}`);

        // Fetch the problem by ID
        const singleProblem = await prob.findById(id);

        // Handle the case where the problem is not found
        if (!singleProblem) {
            throw new ApiError(404, "Single question not found!!");
        }

        // Return the successful response
        return res
            .status(200)
            .json(new ApiResponse(200, singleProblem, "Single question attained successfully!!"));
    } catch (error) {
        console.error(`Error in database by getting the single parameter: ${error.message}`);

        // Send an appropriate error response
        return res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, null, error.message || "Internal Server Error"));
    }
});

const updateProblem=asyncHandler(async(req,res)=>{
            const id= req.params.id;
            const { title, description, difficulty, tags, examples }=req.body;
            if(!id){
                throw new ApiError(401,"id is malformed or not found !!");

            }

         const updateProblem=   await prob.findById({
                $or:[{id},{title},{description},{difficulty},{tags},{examples}]
            },
        {
                    new:true,runValidators:true
        }
       
    )
    if(!updateProblem){
        throw new ApiError("ptoblem cannot update!!");
    }

    return res.status(200).json(new ApiResponse(200,updateProblem,"problem is updated successFully!!"))
});
const deleteProblem=asyncHandler(async(req,res)=>{
    try {
        const { id } = req.params;
    
        const problem = await Problem.findByIdAndDelete(id);
        if (!problem) return res.status(404).json({ message: 'Problem not found' });
    
        res.status(200).json({ message: 'Problem deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }

});

 export {createProblem,getProblem,getSingleProblem,updateProblem,deleteProblem};
