/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
// eslint-disable-next-line no-unused-vars
import e from 'express';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

// discussed with Jonah Kershen
export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  } else {
    User.find({ email }).then((result) => {
      if (result.length !== 0) {
        res.status(405).send('user already in the system!');
      } else {
        const user = new User({ email, password, username });
        // user.email = email;
        // user.password = password;
        // user.username = username;
        // eslint-disable-next-line no-shadow
        user.save().then((result) => {
          res.send({ token: tokenForUser(result) });
        })
          .catch((err) => {
            res.status(500).json({ err });
          });
      }
    });
  }
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
