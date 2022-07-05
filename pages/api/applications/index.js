import { AppController } from "../../../api-lib/controller/app"
import dbConnect from "../../../api-lib/utils/db"
import Head from "next/head"
export default async function handler(req,res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const result = await AppController.get()
                res.status(200).json(result)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const result = await AppController.create(req.body)
                res.status(201).json(result)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break


        default:
            res.status(400).json({ success: false })
            break
    }
}