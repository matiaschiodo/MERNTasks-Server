const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, email, password } = req.body

  try {
    let user = await User.findOne({$or: [{ username },{ email }]})

    if(user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    user = new User(req.body)

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.JWT_SIGNATURE, {
      expiresIn: 60 * 60 * 24 * 7
    }, (error, token) => {
      if(error) throw error
      res.status(201).json({ msg: 'User created', token })
    })

    // res.status(201).json({ msg: 'User created' })
  } catch(error) {
    console.log(error)
    res.status(400).send("Ups! Error")
  }
}