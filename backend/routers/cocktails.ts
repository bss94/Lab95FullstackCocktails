import express from 'express';
import Cocktail from '../models/Cocktail';
import { imagesUpload } from '../multer';
import { CocktailMutation, Ingredient } from '../types';
import auth, { RequestWithUser } from '../middleware/auth';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  try {
    const userId = req.query.user;
    const cocktails = await Cocktail.find(userId ? { author: userId } : { isPublished: true });
    return res.send(cocktails);
  } catch (err) {
    next(err);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const cocktail = await Cocktail.findById(id);
    if (cocktail === null) {
      return res.status(404).send({ error: 'Cocktail not found' });
    }
    return res.send(cocktail);
  } catch (err) {
    next(err);
  }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (req.user) {
      const cocktailMutation: CocktailMutation = {
        author: req.user._id,
        title: req.body.title,
        image: req.file ? req.file.filename : null,
        recipe: req.body.recipe,
        ingredients: JSON.parse(req.body.ingredients) as Ingredient[],
      };
      const newCocktail = new Cocktail(cocktailMutation);
      await newCocktail.save();
      return res.send(newCocktail);
    }
    return res.status(403).send({ error: 'Unauthorized' });
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

export default cocktailsRouter;
