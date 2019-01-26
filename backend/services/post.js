const db = require('../services/dbConnect')

postService = {}

postService.createPost = (id,title,body) =>{
return db.none('INSERT INTO posts (author, title, body) VALUES (${id},${title},${body})',{id,title,body})
}

postService.getPost = (id)=>{
    return db.one('SELECT title,body FROM posts WHERE id = ${id}',{id})
}

postService.updatePost = (id,title,body)=>{
    return db.none('UPDATE posts SET title = ${title}, body=${body} WHERE id=${id}',{id,title,body})
}

postService.deletePost = (id)=>{
return db.none('DELETE FROM posts WHERE id=${id}',{id})
}

postService.getCommentsOnPost = (id)=>{
    return db.many('SELECT c.author,c.title,c.body,p.id,p.author,p.title,p.body FROM comments c INNER JOIN posts p ON c.post_id = p.id WHERE p.id = ${id}',{id})
}

postService.getCommmentOnPostById = (id)=>{
    return db.one('SELECT c.author,c.title,c.body,p.id,p.author,p.title,p.body FROM comments c INNER JOIN posts p ON c.post_id = p.id WHERE c.id = ${id}',{id})
}


module.exports = postService
