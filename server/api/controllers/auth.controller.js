import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User from '../../models/User';
import { checkAccess } from '../utils';
/* eslint indent:0 */
/* eslint no-underscore-dangle: 0 */

/**
 * Login user function, finds username in db and compares hashed password provided in request.
 * In case user was found and password is correct - returns new JWT token.
 *
 * @param {string} req.body.email
 * @param {string} req.body.password
 *
 * @returns {Promise<*|Response|void>}
 */
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).catch((e) => {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    throw (e);
  });

  if (!user) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  return user.comparePassword(req.body.password, (err, isMatch) => {
    if (err) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (isMatch) {
      const JWTToken = jwt.sign({
          email: user.email,
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d'
        });
      return res.json({ token: JWTToken });
    }
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  });
};

/**
 * Verifies provided user token
 *
 * @param {string} req.query.token
 * @param {string} req.headers.token
 *
 * @returns {Promise<*>}
 */
const checkToken = async (req, res) => {
  const user = await checkAccess(req);
  return res.json({
    user
  });
};

export { login, checkToken };
