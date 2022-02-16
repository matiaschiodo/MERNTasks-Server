const User = require('../models/User')

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    let user = await User.findOne({$or: [{ username },{ email }]})

    if(user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    user = new User(req.body)

    await user.save()

    res.status(201).json({ msg: 'User created' })
  } catch(error) {
    console.log(error)
    res.status(400).send("Ups! Error")
  }
}