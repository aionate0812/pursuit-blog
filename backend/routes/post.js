const express = require('express')
const bcrypt = require('bcrypt')
const postRouter = express.Router()
const postService = require ('../services/post')


const checkForToken=(req,res,next)=>{
    if(req.body.token){
        next()
    }
    else{res.json({err:'error'})}
    }


    //CREATE POST
    postRouter.post('/',checkForToken,(req,res)=>{
        const {id,title,body} = req.body
        postService.createPost(id,title,body)
        .then(()=>{
            res.json({response:'post created'})
        })
    })

    //GET POST
    postRouter.get('/:id',(req,res)=>{
        const {id} = req.params
        postService.getPost(id)
        .then((post)=>{
            res.json(post)
        })
    })

    //UPDATE POST

    postRouter.put('/:id',(req,res)=>{
        
    })



    module.exports = postRouter