import App from "../schema/app"

export class AppController {

    static get = async () => {
        const apps = await App.find({ isActive: true }).lean()
        return apps;
    }

    static add = async (data) => {
        const result = await App.create({
            ...data,
            isActive: true
        })
        console.log("🚀 ~ file: app.js ~ line 16 ~ AppController ~ create= ~ result", result)
        return result;
    }

    static update = async (_id,data) => {
        const result = await App.findOneAndUpdate({ _id,isActive: true },data)
        return result;
    }

    static remove = async (data) => {
        await App.findOneAndUpdate({ _id },{
            isActive: false
        })
    }
}