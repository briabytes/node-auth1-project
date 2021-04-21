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
  const {username, password } = req.body
  const [user] = await Users.findBy({username})
  if(user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user
    res.status(200).json({
      message: `welcome, ${username}`
    })
  }else {
    next();
  }
})

router.get('/logout', (req, res) => {
  if(req.session && req.session.user) {
    req.session.destroy(() => {
      res.status(200).json({
        message: 'logged out'
      })
    })
  }else {
    res.status(401).json({
      message: 'no session'
    })
  }
})
 
module.exports = router
