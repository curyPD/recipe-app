import * as Model from './model.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import RecipeView from './views/recipeView.js';
import BookmarksView from './views/bookmarksView.js';

const controlSearchResults = async function (e) {
  try {
    e.preventDefault();
    const inputEl = e.target.querySelector('.input');
    const input = inputEl.value;
    if (!input) return;
    inputEl.value = '';
    ResultsView.renderSpinner();
    await Model.getRecipes(input);
    Model.sliceSearchResults();
    ResultsView.render(Model.state);
    RecipeView.hideMessage();
    ResultsView.toggleMobileSidebar('open');
  } catch (err) {
    console.error(err);
    ResultsView.renderError(err.message);
  }
};

const controlRecipeClick = async function (e) {
  try {
    const recipeEl = e.target.closest('.search-results__item');
    if (!recipeEl) return;
    const { recipeId } = recipeEl.dataset;
    RecipeView.renderSpinner();
    await Model.getRecipe(recipeId);
    RecipeView.render(Model.state.curRecipe);
    ResultsView.toggleMobileSidebar('close');
  } catch (err) {
    console.error(err);
  }
};

const controlChangeServings = function (e) {
  const btnChangeServings = e.target.closest('.btn--change-servings');
  if (!btnChangeServings) return;
  const { changeTo } = btnChangeServings.dataset;
  if (+changeTo === 0) return;
  Model.changeServings(changeTo);
  RecipeView.render(Model.state.curRecipe);
};

const controlPaginationClick = function (e) {
  const paginationBtn = e.target.closest('.btn--pagination');
  if (!paginationBtn) return;
  const { toPage } = paginationBtn.dataset;
  Model.sliceSearchResults(+toPage);
  ResultsView.render(Model.state);
};

const controlAddBookmark = function (e) {
  const btnAddBookmark = e.target.closest('.btn--add-bookmark');
  if (!btnAddBookmark) return;

  Model.controlBookmarks();
  BookmarksView.render(Model.state.bookmarks);
  RecipeView.render(Model.state.curRecipe);
};

const init = function () {
  SearchView.addHandlerSubmit(controlSearchResults);
  ResultsView.addHandlerRecipeClick(controlRecipeClick);
  ResultsView.addHandlerPaginationClick(controlPaginationClick);
  ResultsView.addHandlerMobileSidebar();
  RecipeView.addHandlerChangeServings(controlChangeServings);
  RecipeView.addHanlderAddBookmark(controlAddBookmark);
  BookmarksView.addHandlerBookmarkClick(controlRecipeClick);

  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarks) {
    Model.state.bookmarks = bookmarks;
    if (bookmarks.length > 0) BookmarksView.render(Model.state.bookmarks);
  }
};
init();
