import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	subject: String,
	text: String,
	title: String,
	tags: Array,
	author: { type: mongoose.Schema.ObjectId, ref: 'User' },
	created: { type: Date, default: Date.now() },
	published: { type: Boolean, default: false }
});

export default mongoose.model('Post', postSchema, 'posts');
