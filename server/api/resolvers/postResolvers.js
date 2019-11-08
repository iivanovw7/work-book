import Post from '../../models/Post';
import * as utils from '../utils';
/* eslint indent:0 */
/* eslint no-underscore-dangle: 0 */

export const postResolvers = {

  Query: {

    getPost: async (_, args) => Post.findOne({ _id: args._id })
                                    .exec(),
    /**
     * Returns posts query with limit and skip params
     * @param {Number} args.skip - Results to skip
     * @param {Number} args.limit - Results limit for single page
     * @return {Promise<{skip: number, limit: number, count: number, posts: Array}>}
     */
    getPosts: async (_, args) => {
      const skip = args.skip || 0;
      const limit = args.limit || 5;
      const findPromise = Post.find({})
                              .sort({ created: '-1' })
                              .skip(skip)
                              .limit(limit);

      const countPromise = Post.countDocuments();
      const [output, count] = await Promise.all([findPromise, countPromise])
                                           .catch(() => ({
                                               skip,
                                               limit,
                                               count: 0,
                                               posts: []
                                             }));

      return {
        skip,
        limit,
        count,
        posts: output
      };
    },

    /**
     * Finds Posts by Tag string, returns
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
     * Finds Posts by keyword string, returns
     * searches through post titles and subjects
     *
     * @param {string} args.keyword
     * @returns {Promise<Query>}
     */
    findPostsByKeyword: async (_, args) => {
      const query = {
        $or: [{
          subject: {
            $regex: args.keyword, $options: 'i'
          }
        }, {
          title: {
            $regex: args.keyword,
            $options: 'i'
          }
        }]
      };

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
        author: context.user._id,
        created: Date.now()
      };
      const post = await Post.create(newPost)
                             .catch(e => e.message);
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
        published: args.published,
        created: Date.now()
      };

      const post = await Post.findOneAndUpdate({ _id: args._id }, { $set: set }, { new: true })
                             .catch(e => e.message);

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

      const removedPost = await Post.findByIdAndRemove({ _id: args._id })
                                    .catch(e => e.message);

      if (removedPost) {
        return removedPost;
      }
      return [];
    }
  }
};
