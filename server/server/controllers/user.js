const User = require('../models/User')
const bcrypt = require ('bcrypt');


const checkUser = (async (req, res) => {
    const user = req.query.logEmail;
    const pass = req.query.logPassword;
    const foundUser = await User.findOne({email: user}).exec();

    if (!foundUser) 
    {
        res.status(401).send({message:"No User found"});
    } 
    else 
    {
        const validatePassword = await bcrypt.compare(pass, foundUser.password)

        if (!validatePassword) 
        {
            res.status(401).send({message: "Invalid Password"})
        } 
        else
        {
            res.status(200).send({message:"Success"})
        }
    }
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