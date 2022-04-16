class SearchView {
  _parent = document.querySelector('.form');

  addHandlerSubmit(handler) {
    this._parent.addEventListener('submit', handler);
  }
}

export default new SearchView();
