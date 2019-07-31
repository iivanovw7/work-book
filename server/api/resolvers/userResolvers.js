import bcrypt from 'bcryptjs';
import User from '../../models/User';
/* eslint indent:0 */
/* eslint no-underscore-dangle: 0 */

export const userResolvers = {

  Query: {
    getUsers: async (root, args, context) => {
      if (!context.user) return [];
      const users = await User.find({}).catch(e => e.message);

      if (users) {
        return users;
      }
      return [];
    },

    getUser: async (_, args) => User.findOne({ _id: args._id }).exec()
  },

  Mutation: {
    addUser: async (root, {
      name, surname, email, password, phone, role
    }, context) => {
      if (!context.user) return [];
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        surname,
        email,
        password: hashedPassword,
        phone,
        role
      };
      const user = await User.create(newUser).catch(e => e.message);
      if (user) {
        return user;
      }
      return [];
    }
  }

};
