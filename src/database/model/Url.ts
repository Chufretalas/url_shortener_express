import mongoose from 'mongoose'

const UrlEschema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    }
})

export const UrlModel = mongoose.model("Url", UrlEschema)