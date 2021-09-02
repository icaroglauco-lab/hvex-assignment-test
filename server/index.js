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

const routes = require('./api');

Object.keys(routes).map(method => 
    Object.keys(routes[method]).map(routePath =>
        app[method](routePath, routes[method][routePath])
    )
)