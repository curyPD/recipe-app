export class View {
  render(data) {
    this._data = data;
    this._clearParent();
    this._generateMarkup();
  }

  renderSpinner() {
    this._clearParent();
    const html = `
    <div class="spinner">
      <div class="spinner__circle">
        <div class="spinner__gap"></div>
      </div>
    </div>
  `;

    this._parent.insertAdjacentHTML('afterbegin', html);
  }

  _clearParent() {
    this._parent.innerHTML = '';
  }
}
