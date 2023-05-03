const User = require('../models/User')
const bcrypt = require ('bcrypt');


const checkUser = (async (req, res) => {
    const user = req.body.logEmail;
    const pass = req.body.logPassword;
    //const user = await User.findOne({email: req.body.userEmail}).lean()
    const a = await Users.findOne({email: user}).exec();
    if (!a) {
        console.log(user)
        console.log("not found")
  } else {
        var validatePassword = await bcrypt.compare(pass, User.password)

        if (!validatePassword) {
        res.status(400).send({message: "Invalid Password"})
        } 
        res.status(200).send({message:"Log In Succesful"})
   };
})

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
    createUser,
    checkUser
}