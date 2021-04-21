const { findBy } = require('../users/users-model');

function restricted(req, res, next) {
  if(req.session.user) {
    next()
  }else {
    next({ 
      message: "You shall not pass!", status: 401
    })
  }
}

async function checkUsernameFree(req, res, next) {
  const { username } = req.body
  const user = await findBy({ username })
    if(user.length != 0) {
      res.status(422).json({
        message: 'username taken'
      })
    }else {
      next()
    }
}

async function checkUsernameExists(req, res, next) {
  const { username } = req.body
  const user = await findBy({ username })
    if(!user) {
      res.status(401).json({
        message: 'Invalid credentials'
      })
    }else {
      next()
    }
}

function checkPasswordLength(req, res) {
  if(!req.body.password || req.body.password.length <= 3) {
    res.status(422).json({
      message: "Password must be longer than 3 chars"
    })
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}
