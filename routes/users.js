const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')

// api/users
router.post('/',
  [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'The email must be valid').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 })
  ],
  userController.createUser
)

module.exports = router