const Post = require('../models/Post_Model');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch posts.' });
    }
};

exports.getPostById = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch post.' });
    }
};

exports.createPost = async (req, res) => {
    const { url, description } = req.body;

    try {
        if (!url && !description) {
            return res.status(400).json({ error: 'URL or description is required.' });
        }
        const post = await Post.create({ url, description });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create post.' });
    }
};

exports.deletePostById = async (req, res) => {
    const postId = req.params.postId;

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found.' });
        }
        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete post.' });
    }
};

exports.updatePostById = async (req, res) => {
    const postId = req.params.postId;
    const { url, description } = req.body;
  
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }
  
        // Update the post fields if provided in the request body
        if (url) {
            post.url = url;
        }
        if (description) {
            post.description = description;
        }
  
        // Save the updated post
        await post.save();
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update post.' });
    }
  };