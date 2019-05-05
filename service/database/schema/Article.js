const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建UserSchema
const articleSchema = new Schema({
  id: {
    type: ObjectId
  },
  title: String,
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
