import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/Error.js";
// ErrorHandler
export const getAllUsers = async(req,res)=>{
// User

    const users=await User.find({});
    
 
     res.json({
         success:true,
         users:users,
     })
 }
 export const register = async(req,res,next)=>{



    // console.log(req.body);
  const {name,email,password} = req.body;



let user =await User.findOne({email});
if(user)
 return next(new ErrorHandler("User already exists",400));
 



const hashedPassword = await bcrypt.hash(password,10)
  user = await User.create({

    name,
    email,
    password:hashedPassword
  });

  sendCookie(user,res,"Registered Succesfully",201);

  // const token =jwt.sign({_id:user._id},process.env.JWT_SECRET);

  //  res.status(201).cookie("token",token,{
  //   httpOnly:true,
  //   maxAge:15*60*1000,
  //  }).json({
  //      success:true,
  //      message:"Registered User successfully"
  //  })
}

export const login =async(req,res,next)=>{
  const {email,password}= req.body;

 let user = await User.findOne({email}).select("+password");

 if(!user)
 return next(new ErrorHandler("Invalid email or password",404));
 

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch) return res.status(404).json({
  success:false,
  message:"Invalid email or password"
});

sendCookie(user,res,`Welcome back , ${user.name}`,200)



}

export const getMyDetail = (req,res)=>{

    // const {id} = req.params;

    //  const {token} = req.cookies;

    //  console.log(token);
    //  if(!token) return res.status(404).json({
    //   success:false,
    //   message:"Not logged in"
    // });

    // const decodedData = jwt.verify(token,process.env.JWT_SECRET)

  //  const user=await User.findById(decodedData._id);


   res.status(200).json({
    success:true,
    users:req.user,
})

 }

 export const logout = (req, res) => {
  // console.log(req.user);
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
    secure:process.env.NODE_ENV==="Development"?false:true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

