import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/tasks.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/Error.js";
import cors from "cors"



const app = express();

config({
  path:"./configure.env"
})
// const router = express.Router()





//using middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))


//using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)

mongoose.set('strictQuery',true);
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "SampleApi",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));




app.get("/",(req,res)=>{
    res.send("Nice")
})

//error handler middleware

app.use(errorMiddleware)






app.listen(process.env.PORT,()=>{
    console.log(`server is working on PORT ${process.env.PORT}`);
})
