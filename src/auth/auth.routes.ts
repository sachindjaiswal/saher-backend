import { Router,Request,Response } from "express";
import { registerController } from "./register/register.controller.js";
import { createBankDetailController } from "./bank/bank.controller.js";
import { validateRegisterInput } from "./register/register.middleware.js";
import { validateBankRegisterSchema } from "./bank/bank.middleware.js";

const authRouter = Router()

authRouter.get("/",(req:Request,res:Response)=>{
  return res.status(200).json({message:"This Is A Auth Page"})
})

authRouter.post("/bank-detail",validateBankRegisterSchema,createBankDetailController)

authRouter.post("/register",validateRegisterInput,registerController)

export default authRouter
