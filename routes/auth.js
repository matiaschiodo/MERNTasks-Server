const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')

// api/auth
router.post('/',
  [
    check('username', 'Name is required').not().isEmpty(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 })
  ],
  authController.authenticateUser
)

module.exports = router