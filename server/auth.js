const dblayer = require('./mongodb_connection');


const auth = async (req, res) => {
   // # checking basic auth header
   if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      // yiel if not
      return res.status(401).json({ message: 'Missing Authorization Header' });
   }

   // # verify credentials
   // base64 decrypt
   const base64Credentials =  req.headers.authorization.split(' ')[1];
   const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
   const [username, password] = credentials.split(':');

   // loggin
   console.log("auth.js > 18 : ", base64Credentials, [username, password]);

   // local authenticate service
   return authenticate_service({ username, password })
   .then(user => user)
   .catch(err => {
      console.log("authenticate err", err);
      return null
   });

}

// whitelist path dependecy 
const express_use = (whitelist) => async (req, res, next) => {
   // #make whitelist path list public
   if (Array.from(whitelist).includes(req.path)) {
      return next();
   }
   // # attach user to request object
   req.user = await auth(req, res)
   // express next 
   next();
}


const post_handler = async (req, res) => {
   let user = await auth(req, res);
   if(user!==null) res.status(200).json({ message: 'Sucess credentials check' });
   else res.status(401).json({ message: 'Invalid user credentials' });
}

// authenticate service
const authenticate_service = async ({username, password}) => {
// retorna uma promise que resolve a autenticação de login e senha
   return new Promise( (res, rejc) => {
      dblayer.read('users', async (collection) => {
         collection.findOne({username, password}, (err, result) =>{
            if(result)
               res(result)
            else 
               rejc(err);
         });
      })
   })
}

module.exports = {
   express_use,
   post_handler
};