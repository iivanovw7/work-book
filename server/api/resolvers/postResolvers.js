import Post from '../../models/Post';
import * as utils from '../utils';
/* eslint indent:0 */
/* eslint no-underscore-dangle: 0 */

export const postResolvers = {

  Query: {

    getPosts: async () => Post.find({})
      .sort({ created: '-1' })
      .exec(),

    getPost: async (_, args) => Post.findOne({ _id: args._id })
      .exec(),

    /**
     * Finds single Posts by Tag string, returns
     *
     * @param {string} args.tag
     * @returns {Promise<Query>}
     */
    findPostsByTag: async (_, args) => {
      // From search query parameters
      const query = { tags: { $regex: args.tag, $options: 'i' } };

      return Post.find(query)
        .sort({ created: '-1' })
        .exec();
    },

    /**
     * Collects all tags from all Posts, removes duplicates and returns new array of Tags
     * @returns {Promise<Array|*[]>}
     */
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

    /**
     * Creates new Post object, if something was created - returns new post
     *
     * @param {string} args.tags
     * @param {string} args.subject
     * @param {string} args.title
     * @param {string} args.text
     * @param {object} context.user
     *
     * @returns {Promise<Array|any>}
     */
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

    /**
     * Updates certain fields in Post object, if successful - returns modified Post
     * @param {string} args._id
     * @param {string} args.tags
     * @param {string} args.subject
     * @param {string} args.title
     * @param {string} args.text
     * @param {string} args.published
     * @param {object} context.user
     *
     * @returns {Promise<Array|any>}
     */
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

    /**
     * Removes single post from database by id, if successful - returns removed post if not - returns empty array
     * @param {string} args._id
     * @returns {Promise<Array|any>}
     */
    deletePost: async (_, args, context) => {
      if (!context.user) return [];

      const removedPost = await Post.findByIdAndRemove(
        {
          _id: args._id
        }
      ).catch(e => e.message);

      if (removedPost) {
        return removedPost;
      }

      return [];
    }
  }
};
