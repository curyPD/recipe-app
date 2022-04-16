import { View } from './View.js';

class ResultsView extends View {
  _parent = document.querySelector('.search-results');
  _data;

  renderError(message) {
    this._clearParent();
    const html = `
      <div class="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" class="error-message__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="error-message__text">${message}</p>
      </div>
    `;

    this._parent.insertAdjacentHTML('afterbegin', html);
  }

  _clearParent() {
    this._parent.innerHTML = `
    <p class="copyright">
      &copy; Copyright by CuryPD. All rights reserved.
    </p>
    <div class="box-open-sidebar">
      <button class="btn btn--open-sidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="sidebar__icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
    `;
  }

  _generateMarkup() {
    let html = '<ul class="search-results__list">';

    this._data.displayedResults.forEach(recipe => {
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

    html += `
    </ul>
    <div class="pagination">
    
      <button class="btn btn--pagination ${
        this._data.curPage === 1 ? 'transparent' : ''
      }" data-to-page="${this._data.curPage - 1}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="pagination__icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Page ${this._data.curPage - 1}
      </button>
    
    
      <button class="btn btn--pagination ${
        this._data.curPage === this._data.numPages ? 'transparent' : ''
      }" data-to-page="${this._data.curPage + 1}">
        Page ${this._data.curPage + 1}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="pagination__icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
    `;
    this._parent.insertAdjacentHTML('afterbegin', html);
  }

  addHandlerRecipeClick(handler) {
    this._parent.addEventListener('click', handler);
  }

  addHandlerPaginationClick(handler) {
    this._parent.addEventListener('click', handler);
  }

  addHandlerMobileSidebar() {
    this._parent.addEventListener('click', function (e) {
      const btnOpenSidebar = e.target.closest('.btn--open-sidebar');
      if (!btnOpenSidebar) return;
      e.target.closest('.search-results').classList.toggle('sidebar-visible');
    });
  }

  toggleMobileSidebar(action) {
    if (action === 'open') this._parent.classList.add('sidebar-visible');
    if (action === 'close') this._parent.classList.remove('sidebar-visible');
  }
}

export default new ResultsView();
