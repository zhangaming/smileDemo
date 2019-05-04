const mongoose = require('mongoose')
const Schema = mongoose.Schema

//创建UserSchema
const articleSchema = new Schema({
  id: {
    type: ObjectId
  },
  title: {
    unique: true,
    type: String
  },
  type: String,
  content: String,
  html: String,
  read: Number,
  createTime: String,
  updateTime: String
}, {
  collection: 'article'
})

//发布模型
mongoose.model('Article', articleSchema)
