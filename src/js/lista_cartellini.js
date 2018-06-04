const state = require.main.require('./js/state.js');

class ListaCartellini {
  constructor() {
    this.search = document.getElementById('search_bar');
    this.search.addEventListener('search', () => { this.searchElement(); });
    this.result = undefined;
    this.list = document.getElementById('lista_cartellini');
    this.render();
  }

  searchElement() {
    const searchKey = this.search.value;
    if (searchKey === '') {
      this.clear();
      return;
    }
    this.result = [];
    const resultTemp = state.index.search(searchKey, { expand: true });
    Object.keys(resultTemp).forEach((key) => {
      this.result.push(resultTemp[key].ref);
    });

    this.render();
  }

  remove(id, nome, descrizione) {
    state.index.removeDoc({
      id,
      nome,
      descrizione });
    this.render();
  }

  clear() {
    this.search.value = '';
    this.result = undefined;
    this.render();
  }

  render() {
    if (this.result === undefined) {
      Object.keys(state.cartellini).forEach((key) => {
        let order = key;
        if (state.cartellini[key].quantity > 0 && state.cartellini[key].quantity !== '') {
          order = -1 * state.cartellini[key].quantity;
        }
        window.setTimeout(() => {
          this.list.appendChild(state.cartellini[key].render(order));
        }, 500);
      });
    } else {
      Object.keys(state.cartellini).forEach((key) => {
        const order = this.result.indexOf(key);
        if (order < 0) {
          window.setTimeout(() => { state.cartellini[key].hide(); }, 500);
        } else {
          window.setTimeout(() => { state.cartellini[key].setOrder(order); }, 500);
        }
      });
    }
  }
}

module.exports = ListaCartellini;
