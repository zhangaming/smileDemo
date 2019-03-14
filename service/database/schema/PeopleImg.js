const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
  id:{unique:true,type:String},
  type:{type:Number},
  img:{type:String}
},{
  collection:'peopleimg'
})

mongoose.model('PeopleImg',imgSchema)
