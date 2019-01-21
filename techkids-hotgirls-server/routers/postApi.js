const express = require('express');
const PostApi = express.Router();

const PostModel = require('../models/postModel');

PostApi.use((req, res, next) => {
    console.log('Middleware');
    req.post = 'post1';
    next();
});

//Read all posts
PostApi.get('/', (req, res) => {
    PostModel.find({})
        .then((posts) => {
            res.send(posts);
        })
        .catch((err) => {
            res.send({ error: err });
        });
});

//Read post by id
PostApi.get('/:postId', (req, res) => {
    const { postId } = req.params;
    PostModel.findById(postId)
        .then((postFound) => {
            res.send({ data: postFound })
        })
        .catch((error) => {
            res.send({ error });
        });
});

// Create post
PostApi.post('/', (req, res) => {
    const { picture, description, like, title, comments, views, author } = req.body;
    const newPost = { picture, description, like, title, comments, views, author };
    PostModel.init()
        .then(() => {
            return PostModel.create(newPost);
        })
        .then((postCreated) => {
            res.send({ data: postCreated });
        })
        .catch((err) => {
            res.send({ error: err });
        })
});

//Update posts
PostApi.put('/:postid', (req, res) => {
    const { picture, description, like, title, comments, views, author } = req.body;
    PostModel.findById(req.params.postid)
        .then((result) => {
            if (!result) res.send({ error: "User not exist!" });
            else {
                result.picture = picture;
                result.description = description;
                result.like = like;
                result.title = title;
                result.comments = comments;
                result.views = views;
                result.author = author;
                return result.save();
            }

        })
        .then((postUpdated) => {
            res.send(postUpdated);
        })
        .catch((err) => {
            res.send({ error: err });
        })
});

//Delete posts
PostApi.delete('/:postId', (req, res) => {
    const { postId } = req.params;
    PostModel.findByIdAndRemove(postId)
        .then(() => {
            res.send({ data: "success" })
        })
        .catch((err) => {
            res.send({ err })
        })
})
module.exports = PostApi;