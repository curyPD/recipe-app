import { API_KEY } from './config.js';
import { RESULTS_PER_PAGE } from './config.js';
import { transformUnderscoreToCamelCase } from './helpers.js';
import { getJSON } from './helpers.js';
import { SECONDS_FOR_AJAX_CALL } from './config.js';

export const state = {
  recipes: [],
  curRecipe: {},
  curPage: 1,
  displayedResults: [],
  numPages: 0,
  bookmarks: [],
};

export const getRecipes = async function (query) {
  try {
    const response = await getJSON(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${API_KEY}`,
      SECONDS_FOR_AJAX_CALL
    );

    const { data } = await response.json();
    const { recipes } = data;
    if (recipes.length === 0)
      throw new Error('No results for your query. Please try again');
    state.recipes = recipes.map(recipe =>
      Object.fromEntries(
        Object.entries(recipe).map(([key, value]) => [
          transformUnderscoreToCamelCase(key),
          value,
        ])
      )
    );
    state.recipes.forEach(recipe => {
      recipe.bookmarked = state.bookmarks.some(
        bookmark => bookmark.id === recipe.id
      );
    });
    state.curPage = 0;
    state.numPages = Math.ceil(state.recipes.length / RESULTS_PER_PAGE);
  } catch (err) {
    throw err;
  }
};

export const getRecipe = async function (query) {
  try {
    const response = await getJSON(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${query}?key=${API_KEY}`,
      SECONDS_FOR_AJAX_CALL
    );

    const { data } = await response.json();
    const { recipe } = data;
    state.curRecipe = Object.fromEntries(
      Object.entries(recipe).map(([key, value]) => [
        transformUnderscoreToCamelCase(key),
        value,
      ])
    );
    state.curRecipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === recipe.id
    );
  } catch (err) {
    console.error(err);
  }
};

export const changeServings = function (changeTo) {
  const servings = state.curRecipe.servings;
  state.curRecipe.servings = changeTo;
  state.curRecipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * changeTo) / servings;
  });
};

export const sliceSearchResults = function (sliceTo = 1) {
  state.curPage = sliceTo;
  const displayedResults = state.recipes.slice(
    (state.curPage - 1) * RESULTS_PER_PAGE,
    RESULTS_PER_PAGE * sliceTo
  );
  state.displayedResults = displayedResults;
};

export const controlBookmarks = function () {
  if (state.bookmarks.some(recipe => recipe.id === state.curRecipe.id)) {
    const index = state.bookmarks.findIndex(
      recipe => recipe.id === state.curRecipe.id
    );
    state.bookmarks.splice(index, 1);
    state.curRecipe.bookmarked = false;
  } else {
    state.bookmarks.push(state.curRecipe);
    state.curRecipe.bookmarked = true;
  }
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
