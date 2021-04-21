const router = require('express').Router();

const Users = require('./users-model');
const { restricted } = require('../auth/auth-middleware');

router.get('/', restricted, async (req, res, next) => {
  try{
    const users = await Users.find()
    res.json(users)
  }catch (error) {
    next(error)
  } 
})

module.exports = router;
