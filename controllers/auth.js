const bcrypt = require('bcrypt');
const User = require('../models/User');
const salt = 10
module.exports.register = async (req, res) => {
    const newUser = await new User({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
    })
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
    
    
}