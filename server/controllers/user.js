const User = require('../models/User')
const bcrypt = require ('bcrypt');


const createUser = (async (req, res) => {
    const hashedPw = await bcrypt.hash(req.body.userPassword, 10);

    const newUser = new User({
        email: req.body.userEmail,
        password: hashedPw
    })
    newUser.save()
    res.status(201).json(newUser)
})

module.exports = {
    createUser
}