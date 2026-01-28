import { NextFunction, Request, Response } from "express";
import z from "zod";

const LoginInputSchema = z.object({
  email: z.email(),
  password: z.string()
})

export type LoginInputType = z.infer<typeof LoginInputSchema>

export const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
  const parsedLoginInput = LoginInputSchema.safeParse(req.body)

  if (!parsedLoginInput.success) {
    return res.status(400).json({ message: parsedLoginInput.error.issues[0] })
  }

  req.body = parsedLoginInput.data
  next()
}
