const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' })
    }

    const correctPassword = await bcryptjs.compare(password, user.password)
    if (!correctPassword) {
      return res.status(400).json({ msg: 'The username or password is incorrect' })
    }

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SIGNATURE,
      {
        expiresIn: 60 * 60 * 24 * 7,
      },
      (error, token) => {
        if (error) throw error
        res.status(202).json({ msg: 'Authenticated user', token })
      }
    )
  } catch (error) {
    console.log(error)
  }
}

exports.userAuthenticated = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'There was an error' })
  }
}

const funcion = async (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i]
  }
}
