import dbConnect from "../../../api-lib/utils/db";
import { MetaController } from "../../../api-lib/controller/Meta";
export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const result = await MetaController.update(id, req.body);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const result = await MetaController.remove(id);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
