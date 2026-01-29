import express from "express"
import { Router } from "express"
import { Attendence } from "./database/attendence.model"
import { User } from "../../database/user.model.js"


const attendenceRouter = Router()

attendenceRouter.post("/", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = User.findOne({ email })

        if (!user) {
            res.status(404).json({ success: false, message: "Error" })
        } else {
            if (user.password === password) {
                const newAttendence = new Attendence({
                    email: email
                })
                await newAttendence.save()
                res.status(400).json({success:true,message : "You have marked you attendence successfully"})
            }else{
                res.send(404).json({success : false , message : "Your password is incorrect"})
            }
        }
    } catch (error) {
        res.status(404).json({message : "There was Some Error"})
    }

})

export default attendenceRouter