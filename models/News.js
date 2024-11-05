const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
    post_date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
        default: "/images/default_news.jpg"
    },
    content: {
        snipet: {
            type: String
        },
        body: {
            type: String,
            required: true
        }
    }
}, {timestamps: true})
const News = mongoose.model('News', NewsSchema)
module.exports = News