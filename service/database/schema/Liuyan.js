const mongoose = require('mongoose')
const Schema = mongoose.Schema

//创建UserSchema
const userSchema = new Schema({
  user: {
    unique: true,
    type: String
  },
  message: String,
  createTing: {
    type: Date,
    default: Date.now()
  },
}, {
  collection: 'message'
})

//发布模型
mongoose.model('Liuyan', userSchema)
