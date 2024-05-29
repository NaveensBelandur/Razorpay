const Express = require('express')
const App = Express()
const env = require('dotenv').config()
const SetUpDb = require('./Db/Database')
const Route = require('./Route/Routes')
const cors = require('cors')






SetUpDb()

App.use(cors())
App.use(Express.json())
App.use('/',Route)




App.listen(process.env.PORT,()=>{
    console.log(`Connected to the Port ${process.env.PORT}`)
})