const mongoose = require('mongoose')
const Schema = mongoose.Schema

//创建UserSchema
const userSchema = new Schema({
  count: Number,
  ip: String,
  orNew: Boolean,
  cid: String,
  cname: String
}, {
  collection: 'ip'
})

//发布模型
mongoose.model('IP', userSchema)
