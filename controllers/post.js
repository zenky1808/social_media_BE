const Post = require('../models/Post');
const User = require('../models/User');

module.exports.getPost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        !post && res.status(404).json("Post not found")
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const savePost = await newPost.save()
        res.status(200).json({
            message: "Success",
            savePost
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updatePost = async (req, res) => {
    const postId = req.params.id
    const userId = req.body.userId
    try {
        const post = await Post.findById(postId)
        if(post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json({
                message: "update success",
            })
        }else {
            res.status(403).json("You can update only your post !")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deletePost = async (req, res) => {
    const postId = req.params.id
    const userId = req.body.userId
    try {
        const post = await Post.findById(postId)
        if(post.userId === userId) {
            await post.deleteOne()
            res.status(200).json({
                message: "update success",
            })
        }else {
            res.status(403).json("You can delete only your post !")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
// like dislike a post
module.exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId} })
            res.status(200).json("The post has been like")
        }else {
            await post.updateOne({ $pull: { likes: req.body.userId} })
            res.status(200).json("The post has been dislike")
            
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getTimeline = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId)
        const userPost = await Post.find({ userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )
        res.status(200).json(userPost.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
}