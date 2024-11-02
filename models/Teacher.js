const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeacherSchema = new Schema({
    
}, {timestamps: true})
const News = mongoose.model('News', TeacherSchema)
module.exports = News