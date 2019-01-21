const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	author: String,
	comment: String
}, {
	_id: false
});

const PostSchema = new Schema({
	picture: { type: String, required: true },
	description: String,
	like: [String],
	title: { type: String, required: true },
	comments: [CommentSchema],
	view: { type: Number, default: 0 },
	author: String
}, {
	timestamps: true // createdAt updatedAt
});

module.exports = mongoose.model("post", PostSchema);