const express = require('express')
const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')
const userRouter = express.Router()
const userService = require('../services/user')

const checkForToken=(req,res,next)=>{
if(req.body.token){
    next()
}else{
res.json({err:'error'})
}
}


//GET USER
userRouter.get('/:id', (req, res) => {
    const {
        id
    } = req.params
    userService.read(id).then(user => {
        res.send(user)
    })
})

//CREATE USER
userRouter.post('/', (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    bcrypt.hash(password, 10)
        .then((hash) => {
            userService.create(username, email, hash)
        });
})

//UPDATE USER
userRouter.put('/:id',checkForToken, (req, res) => {
    const {
        id
    } = req.params
    const {
        username,
        email,
        password,
        token
    } = req.body

   
        if(token){
        userService.update(id, username, email, password)
        }
    })
    

    //DELETE USER
userRouter.delete('/:id', checkForToken,(req, res) => {
    const {
        id
    } = req.params
    userService.delete(id)
})


//USER LOGIN
userRouter.post('/login',(req,res)=>{
    const {id,password} = req.body

userService.readPassword(id)
.then((user)=>{
  return  bcrypt.compare(password,user.password)
}).then((isTrue)=>{
if(isTrue){
    const token = uuidv1()
    userService.updateToken(id,token)
    res.json({response:'You are logged in',token})
}
})

})

userRouter.get('/:id/posts',checkForToken,(req,res)=>{
    const {id} = req.params
    userService.readPosts(id)
    .then((posts)=>{
        res.json(posts)
    },(err)=>{
        res.json({err})
    })
    
})

module.exports = userRouter