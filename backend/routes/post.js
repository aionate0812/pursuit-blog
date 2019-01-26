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

    postRouter.put('/:id',checkForToken,(req,res)=>{
        const {id} = req.params
       const {title,body} = req.body
        postService.updatePost(id,title,body)
        .then(()=>{
            res.json({response:'post updated'})
        })
    })

    //DELETE POST 
    postRouter.delete('/:id',checkForToken,(req,res)=>{
        const {id} = req.params
        postService.deletePost(id).then(()=>res.json({response:'post deleted'}))

    })

//GET COMMENTS ON POST
postRouter.get('/:id/comments',(req,res)=>{
    const {id} = req.params

    postService.getCommentsOnPost(id)
    .then((data)=>{
res.json(data)
    })
})

//GET COMMENT ON POST BY ID

postRouter.get('/:id/comments/:comment_id',(req,res)=>{
    const {comment_id} = req.params
    postService.getCommmentOnPostById(comment_id)
})
    module.exports = postRouter