import '@babel/polyfill/noConflict';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import request from 'supertest';
import Post from '../../models/Post';
import User from '../../models/User';
import { app } from '../app';
import { checkAccess, words, forEachCallback } from '../utils';
import { testAuthUser, testPost } from './__mocks__/models';

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let db;
let token;

const removeData = async () => {
	await User.deleteMany({}); // Removing user object used for testing
	await Post.deleteMany({}); // Removing post object used for testing
};

/* eslint no-underscore-dangle: 0 */
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
					.catch((err) => {
						console.log(err);
					});

	db = mongoose.connection;

	await removeData()
		.catch((e) => {
			console.log(e);
		}); // Clearing mock database

	await new User(testAuthUser).save(); // Create test User
	await new Post(testPost).save(); // Create test Post
	done();
});

afterAll(async (done) => {
	await removeData()
		.catch((e) => {
			console.log(e);
		}); // Clearing mock database
	await db.close();
	done();
});

describe('Checking auth functions: ', () => {
	it('Check expect to receive OK', async (done) => {
		request(app)
			.get('/auth/check')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.query({ token })
			.expect(200, (err, res) => {
				expect(res.text).toBe('OK');
				done();
			});
	});

	it('Checking LOGIN route, expect code 200', async (done) => {
		request(app)
			.post('/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send({ email: 'EMAIL@mail.com' })
			.send({ password: '123' })
			.then((response) => {
				expect(response)
					.not
					.toBeNull();
				expect(response.statusCode)
					.toBe(200);
				token = response.body.token;
				done();
			});
	});

	it('checkAccess(req) expect to receive correct user object', async (done) => {
		const req = {
			user: testAuthUser,
			headers: { token }
		};

		const user = await checkAccess(req);
		expect(user.email)
			.toBe(testAuthUser.email);

		done();
	});

	it('checkToken(req) expect to receive correct user object', async (done) => {
		request(app)
			.get('/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.query({ token })
			.expect(200, (err, res) => {
				expect(res.body.user.email)
					.toBe(testAuthUser.email);

				done();
			});
	});

	it('Should run  words() and verify result', () => {
		const testString = 'Sentence1 with word,testing';
		expect(words(testString)).toEqual(['Sentence1', 'with', 'word', 'testing']);
	});

	it('Should run forEachCallback() and verify result', () => {
		const testArray = ['Sentence1', 'with', 'word', 'testing'];
		const result = [];
		forEachCallback(testArray, val => result.push(val));
		expect(result).toEqual(testArray);
	});

});
