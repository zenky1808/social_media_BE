const bcrypt = require('bcrypt');
const User = require('../models/User');
const salt = 10;

// Register
module.exports.register = async (req, res) => {
    try {
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = await new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword
        })
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}

// Login
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email: email});

        if(user){
            const comparePassword = bcrypt.compareSync(password, user.password);
            if(comparePassword == true){
                res.status(200).json({data: user})
            }else {
                res.status(400).json("Wrong password");
            }
        }else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        res.status(400).json(error);
    }
}