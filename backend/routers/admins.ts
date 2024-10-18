import express from 'express';
import Cocktail from '../models/Cocktail';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const adminsRouter = express.Router();

adminsRouter.get('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const cocktails = await Cocktail.find().populate('author', 'email');
    return res.send(cocktails);
  } catch (error) {
    next(error);
  }
});

adminsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const cocktail = await Cocktail.findById(id);
    if (!cocktail) {
      return res.status(404).send({ error: 'Cocktail not found' });
    }
    await cocktail.deleteOne();
    return res.send({ deleted: true });
  } catch (error) {
    next(error);
  }
});

adminsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const cocktail = await Cocktail.findById(id);
    if (!cocktail) {
      return res.status(404).send({ error: 'Cocktail not found' });
    }
    await cocktail.updateOne({ isPublished: true });
    return res.send({ published: true });
  } catch (error) {
    next(error);
  }
});

export default adminsRouter;
