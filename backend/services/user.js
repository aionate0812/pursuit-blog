const db = require('../services/dbConnect')

const userService = {}

userService.create = (username,email,password)=>{
return db.none('INSERT INTO users (username, email, password) VALUES (${username},${email},${password})',{username,email,password})
}

userService.read = (id)=>{
return db.one('SELECT username FROM users WHERE id=${id}',{id})
}

userService.readToken = (id)=>{
    return db.one('SELECT token FROM users WHERE id=${id}',{id})
}

userService.readPassword = (id)=>{
    return db.one('SELECT username, password FROM users WHERE id=${id}',{id})
    }

userService.readPosts = (id)=>{
    return db.many('SELECT title, body FROM posts WHERE author=${id}',{id})
}    

userService.updateToken = (id,token)=>{
    return db.none('UPDATE users SET token = ${token} WHERE id = ${id}', {id,token})
}

userService.update = (id,username,email,password)=>{
return db.none('UPDATE users SET username = ${username}, email=${email},password=${password} WHERE id=${id}',{id,username,email,password})
}

userService.delete = (id)=>{
return db.none('DELETE FROM posts WHERE author = ${id}; DELETE FROM users WHERE id =${id}',{id})
}


module.exports = userService