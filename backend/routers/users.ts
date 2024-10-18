import express from 'express';
import mongoose from 'mongoose';
import config from '../config';
import { OAuth2Client } from 'google-auth-library';
import { imagesUpload } from '../multer';
import User from '../models/User';

const usersRouter = express.Router();
const googleClient = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});
usersRouter.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: 'User not found!' });
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Password is wrong!' });
    }
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return next(error);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({ error: 'Google Login Error!' });
    }
    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;
    const avatar = payload.picture;
    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue!' });
    }
    let user = await User.findOne({ googleId: id });
    if (!user) {
      const newPassword = crypto.randomUUID();
      user = new User({
        email: email,
        password: newPassword,
        confirmPassword: newPassword,
        googleId: id,
        displayName,
        avatar,
      });
    }
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return next(error);
  }
});
usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    if (!headerValue) return res.status(204).send();
    const [_bearer, token] = headerValue.split(' ');
    if (!token) return res.status(204).send();
    const user = await User.findOne({ token });
    if (!user) return res.status(204).send();
    user.generateToken();
    await user.save();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
