const db = require('../services/dbConnect')

commentService = {}

commentService.createComment = (author,post,title,comment) =>{
    return db.none('INSERT INTO comments (author, post_id, title, body) VALUES (${author},${post},${title},${body})',{author,post,title,comment})
}

commentService.getComment = (id)=>{
return db.one('SELECT author,post_id, title, body FROM comments WHERE id=${id}',{id})
}

commentService.updateComment = (id,title,body)=>{
    return db.none('UPDATE comments SET title=${title}, body=${body} WHERE id =${id}',{id,title,body})
}

commentService.deleteComment = (id)=>{
    return db.none('DELETE FROM users WHERE id=${id}',{id})
}
module.exports = commentService