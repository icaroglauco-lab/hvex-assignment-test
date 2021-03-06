const mongojs = require('mongojs');

const uri = "mongodb+srv://adm:<password>@cluster0.xcuvy.mongodb.net/basic_room_crud?retryWrites=true&w=majority";

const db = mongojs(uri, ['users', 'messages', 'rooms'])

// db use interface
module.exports = {
   read: (collection_name, callback) => callback(db[collection_name]),
   create: ({at, doc, callback}) => db[at].insertOne(doc, callback),
   update: ({at, doc, callback}) => db[at].update(doc.where, {$set: doc.with}, {multi: true}, callback),
   delete: (collection_name, doc, cb) => db[collection_name].remove(doc, false, cb)
};
