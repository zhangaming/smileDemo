const mongoose = require('mongoose')
const Schema = mongoose.Schema

//创建UserSchema
const Count = new Schema({
  count: {
    type: Number,
    default: 0
  }
}, {
  collection: 'count'
})

//发布模型
mongoose.model('Count', Count)
