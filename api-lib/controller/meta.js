import Meta from "../schema/meta";

export class MetaController {
  static get = async () => {
    const apps = await Meta.find({ isActive: true })
      .populate(["app", "page"])
      .lean();
    return apps;
  };

  static create = async (data) => {
    const result = await Meta.create({
      ...data,
      isActive: true,
    });

    return result;
  };

  static update = async (_id, data) => {
    const result = await Meta.findOneAndUpdate({ _id, isActive: true }, data);
    return result;
  };

  static remove = async (_id) => {
    await Meta.findOneAndUpdate(
      { _id },
      {
        isActive: false,
      }
    );
  };
}
