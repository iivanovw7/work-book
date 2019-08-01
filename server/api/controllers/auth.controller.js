import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User from '../../models/User';
import { checkAccess } from '../utils';
/* eslint indent:0 */
/* eslint no-underscore-dangle: 0 */

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

const checkToken = async (req, res) => {
  const user = await checkAccess(req);
  return res.json({
    user
  });
};

export { login, checkToken };
