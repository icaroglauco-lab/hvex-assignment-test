const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema(
   {
      userid: { type: String, required: true },
      when: { type: [String], required: true },
      text: { type: String, required: true },
      roomid: {type: String, required: true},
   },
   { timestamps: true },
)

module.exports = mongoose.model('message', Message)