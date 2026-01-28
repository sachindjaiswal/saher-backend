import { Request, Response } from "express"
import { User } from "../../database/user.model.js"
import { Account } from "../../database/account.model.js"

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found.", data: null })
    }

    const userAccount = await Account.findOne({ user: user._id })

    if (!userAccount) {
      return res.status(404).json({ success: false, message: "User Account Not Found.", data: null })
    }

    if (!userAccount.password === password) {
      return res.status(400).json({ success: false, message: "Invalid Credentials.", data: null })
    }

    return res.status(200).json({ success: true, message: "Login Succesfully.", data: "token" })

  } catch (error) {
    console.error(error)
    return res.status(500).json("Internal Server Error")
  }
}
