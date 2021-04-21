const router = require('express').Router();

const Users = require('./users-model');
const { restricted } = require('../auth/auth-middleware');

router.get('/', restricted, (req, res, next) => {
    Users.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
})

module.exports = router;
