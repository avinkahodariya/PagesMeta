import Page from "../schema/page";

export class PageController {

    static get = async () => {
        const apps = await Page.find({ isActive: true }).populate(["app","parent"]).lean()
        return apps;
    }

    static create = async (data) => {

        const result = await Page.create({
            ...data,
            isActive: true
        })
        return result;
    }

    static update = async (_id,data) => {
        const result = await Page.findOneAndUpdate({ _id,isActive: true },data)
        return result;
    }

    static remove = async (data) => {
        await Page.findOneAndUpdate({ _id },{
            isActive: false
        })
    }
}