const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get all user
module.exports.getUser = async (req, res) => {
    try {
        const dataUser = await User.find();
        res.status(200).json({data: dataUser});
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get user by id
module.exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({_id: id})
        !user && res.status(404).json("User not found");
        res.status(200).json({data: user})
    } catch (error) {
        res.status(500).json(error)
    }
}

// Update User
module.exports.updateUser = async (req, res) => {
    const id = req.params.id
    const userID = req.body.userId
    const salt = 10
    try {
        if(userID == id){
            try {
                const passwordUpdate = req.body.password;
                if(passwordUpdate){
                    req.body.password = bcrypt.hashSync(passwordUpdate, salt);
                }
                
                const user = await User.findByIdAndUpdate({ _id: id }, {$set: req.body})
                res.status(200).json({
                    message: "Update success",
                    data: user
                })
            } catch (error) {
                res.status(400).json(error)
            }
        } else {
            return res.status(403).json("Your can update account ")
        }
    } catch (error) {
        console.log(error);
    }
}

// Delete user 
module.exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete({ _id: id})
        res.status(200).json("Delete success")
    } catch (error) {
        res.status(500).json(error)
    }
}

// Follow a user
module.exports.followUser = async (req, res) => {
    const id = req.params.id
    const userId = req.body.userId
    if(userId !== id) {
        try {
            const user = await User.findById(id)
            const currentUser = await User.findById(userId)
            if(!user.followers.includes(id)) {
                await user.updateOne({ $push: { followers: userId }})
                await currentUser.updateOne({ $push: { followings: userId }})
                res.status(200).json("User has been followed")
            }else {
                res.status(403).json("You allready follow this user")
            }
        } catch (error) {
            
        }
    }else {
        res.status(403).json("You can follow yourself")
    }
}

// Unfollow user 
module.exports.unFollowUser = async (req, res) => {
    const id = req.params.id
    const userId = req.body.userId
    if(userId !== id) {
        try {
            const user = await User.findById(id)
            const currentUser = await User.findById(userId)
            if(!user.followers.includes(id)) {
                await user.updateOne({ $pull: { followers: userId }})
                await currentUser.updateOne({ $pull: { followings: userId }})
                res.status(200).json("User has been unfollowed")
            }else {
                res.status(403).json("You allready unfollow this user")
            }
        } catch (error) {
            
        }
    }else {
        res.status(403).json("You can unfollow yourself")
    }
}