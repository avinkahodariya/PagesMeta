import mongoose from 'mongoose'

const PageSchema = new mongoose.Schema({
    pageKey: {
        type: String,
        lowercase: true,
        required: [true,'Please provide a name for this page.'],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Application"
    },
    keywords: {
        type: String
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page"
    },
    metadata: [{
        name: String,
        value: String
    }],
},{
    timestamps: true
})
// const Page = mongoose.model('Page', PageSchema);
// module.exports = Page;

export default mongoose.models.Page || mongoose.model('Page',PageSchema)
