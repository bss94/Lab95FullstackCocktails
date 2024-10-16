import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('artists');
    await db.dropCollection('users');
  } catch (err) {
    console.log('skipping drop');
  }

  const admin = new User({
    email: 'admin@admin.local',
    password: 'admin',
    confirmPassword: 'admin',
    avatar: 'sadasdasdasd',
    displayName: 'Big Boss',
    role: 'admin',
  });
  admin.generateToken();
  await admin.save();

  const cocktail = new Cocktail({
    author: admin,
    title: 'title',
    image: 'image',
    recipe: 'recipe',
    ingredients: [
      {
        ingredientName: 'abcd',
        amount: '10 gr',
      },
      {
        ingredientName: 'aaa',
        amount: '10 gr',
      },
      {
        ingredientName: 'bbbbb',
        amount: '10 gr',
      },
      {
        ingredientName: 'aaa',
        amount: '10 gr',
      },
    ],
    rate: [
      {
        user: admin,
        rate: 5,
      },
    ],
  });
  await cocktail.save();

  await db.close();
};

run().catch(console.error);
