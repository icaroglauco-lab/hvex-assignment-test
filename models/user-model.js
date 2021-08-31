const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
   {
      name: { type: String, required: true },
      last_acess: { type: [String], required: true },
      username: { type: String, required: true },
      password: {type: String, required: true},
      privilege_level: {type: Number, required: true}
   },
   { timestamps: true },
)

module.exports = mongoose.model('user', User)