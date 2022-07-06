import { MetaController } from "../../../api-lib/controller/Meta";
import dbConnect from "../../../api-lib/utils/db";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const result = await MetaController.get();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const result = await MetaController.create(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
