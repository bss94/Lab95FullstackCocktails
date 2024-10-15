import express from 'express';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
usersRouter.post('/sessions', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
usersRouter.post('/google', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
usersRouter.delete('/sessions', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
