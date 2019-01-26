const pgp = require('pg-promise')({})
const db = pgp('postgres:localhost:5252/blog')

module.exports = db