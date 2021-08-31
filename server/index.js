const express = require('express')
const cors = require('cors')
const app = express()
const auth = require('./auth');
const apiPort = 3000

app.use(cors())
app.use(express.json())

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

// express use basic auth for headers (whitelist:Array<string>)
app.use(auth.express_use(['/', '/login']));
// authenticate /login route
app.post('/login', auth.post_handler)

// socket io init
// socket io new message event <- {"room": string, "message": {"uid": uid, "text": string, "user_uid": uid}}:
// - new message in messages collection

// in memory data init:
// - read (initial) rooms collection
// - read (initial) messages collection
var messages = [] // Array<Message{uid, text, room, user, date}> 

const routes = require('./routes');

Object.keys(routes).map(method => 
    Object.keys(routes[method]).map(routePath =>
        app[method](routePath, routes[method][routePath])
    )
)


// render front-end
app.get('/', (req, res) => {
    res.send('Hello World!')
})