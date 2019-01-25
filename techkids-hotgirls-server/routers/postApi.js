const express = require('express');
const PostApi = express.Router();

const PostModel = require('../models/postModel');

//Middleware
PostApi.use((req, res, next) => {
    console.log("Middleware");
    next();
});

// CRUD - Create, Read, Update, Delete

// Read all posts http://localhost:6699/api/posts?page=1&per_page=5
PostApi.get('/', (req, res) => {
    const { page = 1, per_page = 5 } = req.query;
    // const perPage = 5;
    PostModel.find({})
        .populate('author', 
        { 
            _id: 0, 
            password: 0,
            __v: 0
        })
		.skip((page - 1) * per_page)
        .limit(per_page * 1)
        .then((posts) => {
            res.send({ data: posts });
        })
        .catch((error) => {
            res.send({ error });
        });
});

// Read post by id
PostApi.get('/:postId', (req, res) => {
    const { postId } = req.params;
    PostModel.findById(postId)
        .then((postFound) => {
            res.send({ data: postFound });
        })
        .catch((error) => {
            res.send({ error });
        });
});

// Create post
PostApi.post('/', (req, res) => {
    const { picture, description, title, author } = req.body;
    const newPosts = { picture, description, title, author };
    PostModel.init()
        .then(() => {
            return PostModel.create(newPosts);
        })
        .then((postCreated) => {
            res.send({ data: postCreated });
        })
        .catch((error) => {
            res.send({ error });
        });
});

// Update post
PostApi.put('/:postId', (req, res) => {
    const { postId } = req.params;
    const { description, title, like, comments, view } = req.body;
    PostModel.findById(postId)
        .then((postFound) => {
            if (!postFound) res.send({ error: "Post not exist!" })
            else {
                if (description) postFound.description = description;
                if (title) postFound.title = title;
                if (like) postFound.like = like;
                if (comments) postFound.comments = comments;
                if (view) postFound.view = view;
                return postFound.save();
            }
        })
        .then((postUpdated) => {
            res.send({ data: postUpdated });
        })
        .catch((error) => {
            res.send({ error });
        });
});

// Delete post
PostApi.delete('/:postId', (req, res) => {
    const { postId } = req.params;
    PostModel.findByIdAndRemove(postId)
        .then(() => {
            res.send({ data: "success" });
        })
        .catch((error) => {
            res.send({ error });
        });
});

module.exports = PostApi;