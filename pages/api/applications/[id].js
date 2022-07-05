import { AppController } from "../../../api-lib/controller/app"
import dbConnect from "../../../api-lib/utils/db"

export default async function handler(req,res) {
    const {
        query: { id },
        method
    } = req

    await dbConnect()

    switch (method) {
        case 'PUT':
            try {
                const result = await AppController.update(id,req.body)
                res.status(200).json(result)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const result = await AppController.remove(id)
                res.status(200).json(result)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
