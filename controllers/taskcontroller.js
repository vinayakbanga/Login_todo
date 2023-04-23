import ErrorHandler from "../middleware/Error.js";
import { Task } from "../models/task.js";

export const newTask =async(req,res,next)=>{

   try{ const {title,description}= req.body;
    

   //other methofd to crete a task
   /*
   const task = new Task({title});
   await task.save()
   */

   await Task.create({
       title,
       description,
       user:req.user,
   });


   res.status(201).json({
       success:true,
       message:"Task added"

   })

}
   catch(err){
    next(err)

   }
}
export const getMyTask= async(req,res,next)=>{

    try {
        const userid = req.user._id;

    const tasks = await Task.find({user:userid});

    res.status(200).json({
        success: true,
        tasks,
    })


    } catch (error) {
        next(error)
    }

}
export const updateTask= async(req,res,next)=>{
    

    const {id}= req.params;

    const task= await Task.findById(id);
    if(!task)
      return next(new Error("Invalid id"));

    task.isCompleted = !task.isCompleted;

    await task.save();

    

    res.status(200).json({
        success: true,
        message:"Tasd Updated"
        
    })



}
export const deleteTask= async(req,res,next)=>{

    const {id}= req.params;

    const task= await Task.findById(id);
//    console.log(task);
    


     if(!task)
      return next(new ErrorHandler("Task Not found",404));
    await task.deleteOne();

    

    res.status(200).json({
        success: true,
        message:"Task Deleted"
    })



}