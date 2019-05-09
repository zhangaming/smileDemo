const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
  type: {
    type: Number
  },
  img: {
    type: String
  }
}, {
  collection: 'img'
})

mongoose.model('Img', imgSchema)
