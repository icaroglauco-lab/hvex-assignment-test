const dblayer = require('./dblayer');
const validate = require('./validates');

// DONE
// req read /rooms => [uids]
// req read /messages?room=uid => [<{"user": uid, "text": string, "room": uid}>]
// req /delete_message => success boolean
// req /users => [<{"user_name": string, "name": string, "is_connected": boolean, "last_acess": dateString}>]
// req /create_user => success boolean, uid
// req /edit_user => sucess boolean, uid
// req /delete_user => sucess boolean, liberated uid:
// - query and delete messages related to user

module.exports = {
   'get' : {
      '/user': (req, res) => {
         dblayer.read('users', (collection) => {
            let {username} = req.query;
            collection.find( username? {username}: {} ).toArray((err, docs) => {
               if(err) res.status(500).json({message: 'error processing read'})
               res.status(200).json(docs);
            })
         })
      },
      '/rooms': (req, res) => {
         dblayer.read('rooms', (collection) => {
            collection.find( {} ).toArray((err, docs) => {
               if(err) res.status(500).json({message: 'error processing read'})
               res.status(200).json(docs);
            })
         })
      },
      '/messages': (req, res) => {
         dblayer.read('messages', (collection) => {
            let {room} = req.query;
            collection.find( room? {room}: {} ).toArray((err, docs) => {
               if(err) res.status(500).json({message: 'error processing read'})
               res.status(200).json(docs);
            })
         })
      },
   },
   'post' : {
      '/user': (req, res) => {
         if(!validate.user(req.body)) return res.status(402).json({message: "Ivalid format"})
         dblayer.create({
            at: 'users',
            // TODO: create a server side validation
            doc: req.body,
            callback: (err, value) => {
               if(err) {
                  console.log('routes.js 14>', err);
                  res.statusCode = 500;
               }
               if(value){
                  console.log('routes.js 13>', value);
                  res.status(200).json({ message: 'Sucessed inserting user' });
               }
            }
         });
      },
      '/message': (req, res) => {
         if(!validate.message(req.body)) return res.status(402).json({message: "Ivalid format"})
         dblayer.create({
            at: 'messages',
            // TODO: create a server side validation
            doc: req.body,
            callback: (err, value) => {
               if(err) {
                  console.log('routes.js 68>', err);
                  res.statusCode = 500;
               }
               if(value){
                  console.log('routes.js 72>', value);
                  res.status(200).json({ message: 'Sucessed inserting message' });
               }
            }
         });
      },
      
   },

   'put' : {
      '/user': (req, res) => {
         console.log('83', req.body)
         if(!validate.user(req.body.where)) return res.status(402).json({message: "Ivalid format"})
         if(!validate.user(req.body.with)) return res.status(402).json({message: "Ivalid format"})
         dblayer.update({
            at: 'users',
            // TODO: create a server side validation
            doc: req.body,
            callback: (err, value) => {
               if(err) {
                  console.log('routes.js 14>', err);
                  res.statusCode = 500;
               }
               if(value){
                  console.log('routes.js 13>', value);
                  res.status(200).json({ message: 'Sucessfully updated user' });
               }
            }
         });
      },
   },

   'delete': {
      '/user': (req, res) =>  {
         if(!validate.user(req.body)) return res.status(402).json({message: "Ivalid format"})
         dblayer.delete('users', req.body, (err, status) => {
            if(status.deletedCount == 0) {
               console.log('routes.js 39>', status);
               res.status(500).json({ message: 'Failede deleting user' });
            }
            else{
               // delete related messages
               dblayer.delete('messages', {username: req.body.username}, (err, status) => {})
               res.status(200).json({ message: 'Sucessed deleting user' });
            }
         })
      },

      '/message': (req, res) =>  {
         if(!validate.message(req.body)) return res.status(402).json({message: "Ivalid format"})
         dblayer.delete('messages', req.body, (err, status) => {
            if(status.deletedCount == 0) {
               console.log('routes.js 97>', status);
               res.status(500).json({ message: 'Fail deleting message' });
            }
            else{
               res.status(200).json({ message: 'Sucess deleting message' });
            }
         })
      },
   }
}