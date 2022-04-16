import { View } from './View.js';

class RecipeView extends View {
  _parent = document.querySelector('.main');
  _data;

  hideMessage() {
    this._parent.querySelector('.message')?.classList.add('hidden');
  }

  _generateMarkup() {
    const html = `
    <section class="recipe">
      <div class="recipe__img-box">
        <img
          src="${this._data.imageUrl}"
          alt="Photo of a meal"
          class="recipe__img"
        />
        <button class="btn btn--round ${
          this._data.bookmarked ? 'btn--round-active' : ''
        } btn--add-bookmark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      <div class="recipe__content-box">
        <h1 class="recipe__title">${this._data.title}</h1>

        <div class="recipe__ingredients">
          <h3 class="recipe__heading">Ingredients</h3>
          <ul class="ingredients__list">
            ${this._generateListItems(this._data.ingredients)}
          </ul>
        </div>
        <footer class="recipe__footer">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="footer__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p><span class="cooking-time">${this._data.cookingTime}</span> min</p>
          </div>
          <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="footer__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p><span class="servings">${this._data.servings}</span> servings</p>
          </div>
          <div class="btns-change-servings-box">
            <button class="btn btn--icon btn--change-servings" data-change-to="${
              this._data.servings - 1
            }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button class="btn btn--icon btn--change-servings" data-change-to="${
              +this._data.servings + 1
            }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </section>
    <section class="cta">
      <h2 class="cta__heading">
        This recipe was lovingly created by
        <a href="${this._data.sourceUrl}" target="_blank" class="author">${
      this._data.publisher
    }</a>. See further directions
        on their website.
      </h2>
      </section>
      `;
    // <button class="btn btn--big">Directions</button>
    this._parent.insertAdjacentHTML('afterbegin', html);
  }

  _generateListItems(ingredients) {
    const html = ingredients.reduce((str, ing) => {
      return (str += `
        <li class="ingredients__item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bullet-point"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          
          <span class="ingredient">${ing.quantity || ''}${
        ing.unit ? ' ' + ing.unit : ''
      } ${ing.description}</span>
        </li>
      `);
    }, '');
    return html;
  }

  addHandlerChangeServings(handler) {
    this._parent.addEventListener('click', handler);
  }

  addHanlderAddBookmark(handler) {
    this._parent.addEventListener('click', handler);
  }
}

export default new RecipeView();
