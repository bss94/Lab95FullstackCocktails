import express from 'express';
import mongoose from 'mongoose';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

cocktailsRouter.post('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

cocktailsRouter.patch('/:id/toggleRate', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
cocktailsRouter.delete('/:id', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default cocktailsRouter;
