export interface RegisterMutation {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Rate {
  _id: string;
  user: string;
  rate: number;
}

export interface Ingredient {
  _id: string;
  ingredientName: string;
  amount: string;
}
export interface Cocktail {
  _id: string;
  author: string;
  title: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
  rate: Rate[];
}

export interface IngredientMutation {
  ingredientName: string;
  amount: string;
}
export interface CocktailMutation {
  title: string;
  image: File | null;
  recipe: string;
  ingredients: IngredientMutation[];
}
