import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: String,
  password: String,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  role: { type: String, required: false, default: 'USER' },
  created: { type: Date, default: Date.now() }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema, 'users');
