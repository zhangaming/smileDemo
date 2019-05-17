const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
  skill: {
    type: String
  }
}, {
  collection: 'skill'
})

mongoose.model('Skill', skillSchema)
