import App from "../schema/app";

export class AppController {
  static get = async () => {
    const apps = await App.find({ isActive: true }).lean();
    return apps;
  };

  static create = async (data) => {
    const result = await App.create({
      ...data,
      isActive: true,
    });
    return result;
  };

  static update = async (_id, data) => {
    const result = await App.findOneAndUpdate({ _id, isActive: true }, data, {
      new: true,
    });
    return result;
  };

  static remove = async (_id) => {
    await App.findOneAndUpdate(
      { _id },
      {
        isActive: false,
      }
    );
  };
}
