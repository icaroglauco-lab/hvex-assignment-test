const validator_helper = (arr) => (obj) => 
         Object.keys(obj).reduce( (ac, current) =>
            ac && arr.includes(current), true);

module.exports = {
   'user' : validator_helper(['username', 'name', 'password', 'last_acess', 'privilege_level', 'level']),
   'message': validator_helper(['text', 'room', 'username', 'date'])
}

