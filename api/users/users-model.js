const db = require('../../data/db-config');

function find() {
  return db('users').select('user_id', 'username').orderBy('user_id');
}

function findBy(filter) {
  return db('users').where(filter).orderBy('user_id');
}

function findById(user_id) {
  return db('users')
    .select('user_id', 'username')
    .where({user_id})
      .then(data => {
        return data[0]
      })
}

function add(user) {
  return db('users')
    .insert(user)
      .then(ids => {
        return findById(ids[0])
      })
    
}

module.exports = {
  find,
  findBy,
  findById,
  add
}
