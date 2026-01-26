import { Response, Request, NextFunction } from "express"
import z from "zod"

const bankRegisterSchema = z.object({
  accountHolderName: z.string(),
  bankName: z.string(),
  ifcs: z.string(),
  branch: z.string(),
  mobileNumber: z.string(),
})

export type bankRegisterType = z.infer<typeof bankRegisterSchema>

export const validateBankRegisterSchema = async (req: Request, res: Response, next: NextFunction) => {
  const parsedBankRegisterInput = bankRegisterSchema.safeParse(req.body)


  if (!parsedBankRegisterInput.success) {
    return res.status(400).json({ message: parsedBankRegisterInput.error.issues[0] })
  }

  req.body = parsedBankRegisterInput.data
  next()
}
