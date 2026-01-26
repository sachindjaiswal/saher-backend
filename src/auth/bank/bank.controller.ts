import { Request, Response } from "express";
import { BankDetail } from "../../database/bankDetail.model.js";

export const createBankDetailController = async (req: Request, res: Response) => {
  const { accountHolderName, bankName, ifcs, branch, mobileNumber } = req.body

  try {
    const details = await BankDetail.create({ accountHolderName, bankName, ifcs, branch, mobileNumber })
    return res.status(201).json({ message: "Bank Details Added Succesfull", data: details })
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Registration failed" });
  }
}
