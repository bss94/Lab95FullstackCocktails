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
    console.log('skipping hgg drop');
  }

  const admin = new User({
    email: 'admin@admin.local',
    password: 'admin',
    confirmPassword: 'admin',
    avatar: 'fixtures/admin.jpg',
    displayName: 'Big Boss',
    role: 'admin',
  });
  admin.generateToken();
  await admin.save();

  await Cocktail.create(
    {
      author: admin,
      title: 'Blue Margarita',
      image: 'fixtures/blueMargarita.jpg',
      recipe:
        'Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.',
      isPublished: true,
      ingredients: [
        {
          ingredientName: 'Tequila',
          amount: '1 1/2 oz',
        },
        {
          ingredientName: 'Blue Curacao',
          amount: '1 oz',
        },
        {
          ingredientName: 'Lime juice',
          amount: '1 oz',
        },
        {
          ingredientName: 'Salt',
          amount: 'Coarse',
        },
      ],
      rate: [
        {
          user: admin,
          rate: 5,
        },
      ],
    },
    {
      author: admin,
      title: 'Margarita',
      image: 'fixtures/margarita.jpg',
      recipe:
        'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
      isPublished: true,
      ingredients: [
        {
          ingredientName: 'Tequila',
          amount: '1 1/2 oz',
        },
        {
          ingredientName: 'Triple sec',
          amount: '1/2 oz',
        },
        {
          ingredientName: 'Lime juice',
          amount: '1 oz',
        },
        {
          ingredientName: 'Salt',
          amount: 'Coarse ',
        },
      ],
      rate: [
        {
          user: admin,
          rate: 4,
        },
      ],
    },
    {
      author: admin,
      title: 'Tommy Margarita',
      image: 'fixtures/tomy.jpg',
      recipe: 'Shake and strain into a chilled cocktail glass.',
      isPublished: true,
      ingredients: [
        {
          ingredientName: 'Tequila',
          amount: '4.5 cl',
        },
        {
          ingredientName: 'Lime juice',
          amount: '1.5 cl',
        },
        {
          ingredientName: 'Agave syrup',
          amount: '2 spoon',
        },
      ],
      rate: [
        {
          user: admin,
          rate: 2,
        },
      ],
    },
    {
      author: admin,
      title: 'Whitecap Margarita',
      image: 'fixtures/tomy.jpg',
      recipe: 'Place all ingredients in a blender and blend until smooth. This makes one drink.',
      ingredients: [
        {
          ingredientName: 'Tequila',
          amount: '4.5 cl',
        },
        {
          ingredientName: 'Lime juice',
          amount: '1.5 cl',
        },
        {
          ingredientName: 'Coconut cream',
          amount: '1/4 cup',
        },
        {
          ingredientName: 'Ice',
          amount: '1 cup',
        },
      ],
      rate: [
        {
          user: admin,
          rate: 4,
        },
      ],
    },
  );

  await db.close();
};

run().catch(console.error);
