const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// User Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);

// Post Routes
router.get('/posts', postController.getAllPosts);
router.get('/posts/:postId', postController.getPostById);
router.post('/posts', postController.createPost);
router.delete('/posts/:postId', postController.deletePostById);
router.put('/posts/:postId', postController.updatePostById);

module.exports = router;
