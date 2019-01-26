const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('../backend/routes/user')
const postRouter = require('../backend/routes/post')
const app = express()


app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())


app.use('/user',userRouter)
app.use('/post',postRouter)



app.listen(6500, ()=>{
    console.log('server is running')
})
