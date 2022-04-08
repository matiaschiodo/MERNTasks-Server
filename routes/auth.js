const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const authController = require('../controllers/authController')

// api/auth
router.post('/', authController.authenticateUser)

router.get('/', auth, authController.userAuthenticated)

module.exports = router
