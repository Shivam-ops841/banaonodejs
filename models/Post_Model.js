const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    url: {
        type: String,
        required: function() {
            return !this.description; // URL is required if description is not provided
        }
    },
    description: {
        type: String,
        required: function() {
            return !this.url; // Description is required if URL is not provided
        }
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
