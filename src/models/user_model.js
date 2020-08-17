/* eslint-disable consistent-return */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
// create a PostSchema with a title field

// create PostModel class from schema
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  username: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;
  if (!user.isModified('password')) return next();
  // TODO: do stuff here
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  // Store hash in your password DB.
  user.password = hash;

  return next();

  // when done run the **next** callback with no arguments
  // call next with an error if you encounter one
  // return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // return callback(null, comparisonResult) for success
  // or callback(error) in the error case
  // https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  bcrypt.compare(candidatePassword, this.password, (err, result) => {
    if (err) return callback(err);
    return callback(null, result);
  });
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
