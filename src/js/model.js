import { API_KEY } from './config.js';

export const state = {
  recipes: [],
  curRecipe: {},
};

export const getRecipes = async function (query) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${API_KEY}`
    );
    const { data } = await response.json();
    const { recipes } = data;
    state.recipes = recipes;
  } catch (err) {
    console.error(err);
  }
};

// `https://forkify-api.herokuapp.com/api/v2/recipes?search=pasta&key=${API_KEY}`
// `https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}?key=${API_KEY}`
