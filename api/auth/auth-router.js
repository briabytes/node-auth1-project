const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
} = require('./auth-middleware');

router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  Users.add({ username: username, password: hash })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
})

router.post('/login', checkPasswordLength, checkUsernameExists, async (req, res, next) => {
  const { password } = req.body
  if(bcrypt.compareSync(password, req.user.password)) {
    req.session.user = req.user
    res.json({ message: `welcome ${req.user.username}`, status: 200})
  }else {
    next({ message: 'Invalid credentials', status: 401 })
  }
})

router.get('/logout', (req, res, next) => {
  if(req.session.user) {
    req.session.destroy(err => {
      if(err) {
        next(err)
      }else {
        res.json({ message: 'logged out'})
      }
    })
  }else {
    res.json({ message: 'no session'})
  }
})
 
module.exports = router
