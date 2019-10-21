import '@babel/polyfill/noConflict';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chalk from 'chalk';
import Post from '../../models/Post';
import User from '../../models/User';
import { postResolvers } from '../resolvers/postResolvers';
import { anotherTestPost, testPost, testQueriesUser } from './__mocks__/models';
/* eslint no-underscore-dangle: 0 */
/* eslint indent:0 */

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let db;
let post;

const removeData = async () => {
  await User.deleteMany({}); // Removing user object used for testing
  await Post.deleteMany({}); // Removing post object used for testing
};

beforeAll(async (done) => {
  /**
   * Creates nodeENV variables for testing
   */
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true })
    .then(() => {
      // console.log('Connected to database successfully.');
    })
    .catch((e) => {
      throw e;
    });

  db = mongoose.connection;

  await removeData()
    .catch((e) => {
      throw e;
    }); // Clearing mock database

  await new User(testQueriesUser).save(); // Create test User

  done();
});

afterAll(async (done) => {
  await removeData()
    .catch((e) => {
      throw e;
    }); // Clearing mock database
  await db.close();

  done();
});

describe(`Testing [${chalk.yellow('Queries')}] and [${chalk.yellow('Mutations')}]`, () => {
  it('Should run addPost and return new post', async () => {
    const response = await postResolvers.Mutation.addPost(
      null,
      testPost,
      { user: testQueriesUser }
    );

    expect(response).not.toBe(null);
    expect(response.text).toBe('TEXT');
    post = response;
  });

  it(`Should run [${chalk.yellow('getPosts')}] query and receive mock posts array`, async () => {
    const response = await postResolvers.Query.getPosts();

    expect(response).not.toBe(null);
    expect(response[0].subject).toBe(post.subject);
  });

  it(`Should run [${chalk.yellow('getPost')}] query and receive mock post`, async () => {
    const response = await postResolvers.Query.getPost(
      null,
      { _id: post._id }
    );

    expect(response).not.toBe(null);
    expect(response.subject).toBe(post.subject);
  });

  it(`Should run [${chalk.yellow('findPostsByTag')}] and return mock post`, async () => {
    const response = await postResolvers.Query.findPostsByTag(
      null,
      { tag: testPost.tags[0] }
    );

    expect(response).not.toBe(null);
    expect(response[0].subject).toBe(post.subject);
  });

  it(`Should run [${chalk.yellow('findPostsByKeyword')}] and return mock post`, async () => {
    const response = await postResolvers.Query.findPostsByKeyword(
      null,
      { keyword: testPost.title }
    );

    expect(response).not.toBe(null);
    expect(response[0].subject).toBe(post.subject);
  });

  it(`Should run [${chalk.yellow('getTags')}] and and receive correct list of tags`, async () => {
    // Add one more post, to verify query
    await postResolvers.Mutation.addPost(
      null,
      anotherTestPost,
      { user: testQueriesUser }
    );

    const response = await postResolvers.Query.getTags();

    expect(response).not.toBe(null);
    expect(response).toEqual(['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']);
  });

  it(`Should run [${chalk.yellow('updatePost')}] and return modified post`, async () => {
    const response = await postResolvers.Mutation.updatePost(
      null,
      {
        _id: post._id,
        subject: 'TEST',
        text: 'TEST2',
        title: 'TITLE',
        tags: ['tag4', 'tag5', 'tag6']
      }, { user: testQueriesUser }
    );

    expect(response).not.toBe(null);
    expect(response.text).toBe('TEST2');
  });

  it(`Should run [${chalk.yellow('deletePost')}] and remove mock post from db`, async () => {
    const response = await postResolvers.Mutation.deletePost(
      null,
      { _id: post._id },
      { user: testQueriesUser }
    );

    expect(response).not.toBe(null);
    expect(response.text).toBe('TEST2');
  });
});
