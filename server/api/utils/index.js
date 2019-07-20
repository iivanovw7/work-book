import jwt from 'jsonwebtoken';
import User from '../../models/User';
/* eslint indent:0 */
/* eslint no-underscore-dangle: 0 */

// Function wrapper for async actions
export const catchErrors = fn => function (req, res, next) {
	return fn(req, res, next)
		.catch(next);
};

// Verifies client token, if token is valid returns user object
export const checkAccess = async (req) => {
	const token = req.headers.token || req.query.token;
	const payload = jwt.verify(token, process.env.JWT_SECRET, function (err, verifiedJwt) {
		if (err) {
			return {};
		}
		return verifiedJwt;
	});

	if (!payload._id) return {};

	const user = await User.findOne({ _id: payload._id })
												 .catch(e => console.log(e));

	if (user) return user;
	return {};
};

// Converts string in array of words
export const words = (str, pattern = /[^a-zA-Z-0-9]+/) => str.split(pattern).filter(Boolean);

// Runs over an array and executes callback on every element
export const forEachCallback = (arr, callback) => arr.slice(0).forEach(callback);

