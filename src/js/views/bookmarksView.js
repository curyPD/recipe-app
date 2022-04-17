import { View } from './View.js';

class BookmarksView extends View {
  _parent = document.querySelector('.bookmarks');
  _data;

  constructor() {
    super();

    ['mouseenter', 'click'].forEach(event => {
      this._parent
        .closest('.bookmarks-box')
        .addEventListener(event, function () {
          this.querySelector('.bookmarks').classList.remove('transparent');
        });
    });

    document.addEventListener('click', this._hideBookmarks.bind(this));

    this._parent
      .closest('.bookmarks-box')
      .addEventListener('mouseleave', function () {
        this.querySelector('.bookmarks').classList.add('transparent');
      });
  }

  _hideBookmarks(e) {
    if (e.target === this._parent.closest('.bookmarks-box')) return;
    this._parent.classList.add('transparent');
  }

  _generateMarkup() {
    let html;
    if (this._data.length === 0) {
      html = `
        <div class="message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="message__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <p class="message__text">Save recipes you liked in bookmarks</p>
        </div>
      `;
    } else {
      html = `<ul class="bookmarks__list">`;

      this._data.forEach(recipe => {
        html += `
        <li class="search-results__item" data-recipe-id="${recipe.id}">
          <figure class="search-results__img-box">
            <img
              src="${recipe.imageUrl}"
              alt="Photo of a meal"
              class="search-results__img"
            />
          </figure>
          <div class="search-results__content">
            <p class="search-results__title">${recipe.title}</p>
            <p class="search-results__author">${recipe.publisher}</p>
          </div>
        </li>
      `;
      });

      html += `</ul>`;
    }

    this._parent.insertAdjacentHTML('afterbegin', html);
  }

  addHandlerBookmarkClick(handler) {
    this._parent.addEventListener('click', handler);
  }
}

export default new BookmarksView();
