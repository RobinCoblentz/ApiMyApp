const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Schema
let UserSchema = new Schema({
  phone: {type: String},
  password: {type: String},
  isinjob: {type: Boolean},
  nom: {type: String},
  lat:  {type: String},
  lng: {type: String},
  lastsync:  {type: String},
})

let User = mongoose.model('User', UserSchema)
module.exports = User