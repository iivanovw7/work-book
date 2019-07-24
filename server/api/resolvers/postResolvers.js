import Post from '../../models/Post';
import * as utils from '../utils';
/* eslint indent:0 */
/* eslint no-underscore-dangle: 0 */

export const postResolvers = {

	Query: {

		getPosts: async () => Post.find({}).sort({ created: '-1' }).exec(),

		getPost: async (_, args) => Post.findOne({ _id: args._id }).exec(),

		findPostsByTag: async (_, args) => Post.find({ tags: args.tag })
																					 .sort({ created: '-1' })
																					 .exec(),
		getTags: async () => {
			const tags = [];
			const queryTags = await Post.find({})
																	.distinct('tags')
																	.exec();

			if (!queryTags) return [];

			utils.forEachCallback(queryTags, (val) => {
				utils.forEachCallback(utils.words(val), (tag) => {
					tags.push(tag);
				});
			});

			return Array.from(new Set(tags));
		}
	},

	Mutation: {

		addPost: async (_, args, context) => {
			if (!context.user) return [];
			const newPost = {
				subject: args.subject,
				text: args.text,
				title: args.title,
				tags: args.tags,
				author: context.user._id
			};
			const post = await Post.create(newPost).catch(e => e.message);
			if (post) {
				return post;
			}
			return [];
		},

		updatePost: async (_, args, context) => {
			if (!context.user) return [];
			const set = {
				subject: args.subject,
				text: args.text,
				title: args.title,
				tags: args.tags,
				author: context.user._id,
				published: args.published
			};
			const post = await Post.findOneAndUpdate(
				{ _id: args._id },
				{ $set: set },
				{ new: true }
			).catch(e => e.message);

			if (post) {
				return post;
			}

			return [];
		},

		deletePost: async (_, args, context) => {
			if (!context.user) return [];

			const removedPost = await Post.findByIdAndRemove(
				{ _id: args._id }
			).catch(e => e.message);

			if (removedPost) {
				return removedPost;
			}

			return [];
		}
	}
};
