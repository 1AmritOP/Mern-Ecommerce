import { Request, Response, NextFunction } from "express";
import { newUserReqBody } from "../types/types.js";
import { User } from "../models/user.model.js"; 
import { TryCatch } from "../middlewares/error.js";
import { error } from "console";
import ErrorHandler from "../utils/utility-class.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, newUserReqBody>,
    res: Response,
    next: NextFunction
  ) => {
      const { name, photo, email, dob, _id, gender } = req.body;

      let user=await User.findById(_id);

      if (user) {
        return res.status(201).json({
          success: true,
          message: `welcom ${user?.name}`,
      });
      }

      if(!_id || !name || !email || !photo || !dob || !gender){
        next(new ErrorHandler("Please enter all details",400));
      }
  
      user = await User.create({
        name,
        photo,
        email,
        dob,
        _id,
        gender,
      });
  
      return res.status(201).json({
          success: true,
          message: `welcom ${user?.name}`,
      });
  }
)

export const getAllUsers=TryCatch(async(req,res,next)=>{
  const user= await User.find();

  return res.status(200).json({
    success:true,
    user
  })
});

export const getSingleUser=TryCatch(async(req,res,next)=>{
  const id=req.params.id;
  const user= await User.findById(id);

  if(!user){
    return next(new ErrorHandler("User not found",404));
  }

  return res.status(200).json({
    success:true,
    user,
  })
});

export const deletUser=TryCatch(async (req,res,next)=>{
  const id=req.params.id;
  const user=await User.findByIdAndDelete(id);

  if(!user){
    return next(new ErrorHandler("Invalid Id or user not found ",404));
  }
  

  return res.status(200).json({
    success:true,
    message:"user deleted successfully"
  })
})