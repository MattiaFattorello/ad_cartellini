import state from './resources/app/state.js';

export default class Cartellino {
  constructor(args) {
    if (args.id === undefined) {
      state.next_id -= 1;
      this.id = state.next_id;
    } else {
      this.id = args.id;
    }
    this.nome = args.nome || '';
    this.descrizione = args.descrizione || '';
    this.campagna = args.campagna || '';
    this.colore = args.colore || '';
    this.tipo = args.tipo || '';
    this.requisiti = args.requisiti || '';
    this.fattura = args.fattura || '';
    this.immagine = args.immagine || '';
    this.link = args.link || '';

    this.element = undefined;
    this.selezionato = undefined;
    this.quantity = 0;
    this.listenerDone = false;
    state.index.addDoc({
      id: this.id,
      nome: this.nome,
      descrizione: this.descrizione,
    });
  }

  plusOne() {
    this.quantity += 1;
    if (this.quantity === 1) {
      state.selezionati.push(this.id);
    }
    this.render(this.element.style.order);
    this.renderSelezionato();
  }

  plusFive() {
    for (let i = 0; i < 5; i++) {
      this.plusOne();
    }
  }

  minusOne() {
    if (this.quantity > 0) {
      this.quantity -= 1;
      if (this.quantity === 0) {
        state.selezionati.splice(state.selezionati.indexOf(this.id), 1);
      }
      this.render(this.element.style.order);
      this.renderSelezionato();
    }
  }

  minusFive() {
    for (let i = 0; i < 5; i++) {
      this.minusOne();
    }
  }

  setQuantity(qty) {
    if (qty < 1 && this.quantity > 0) {
      state.selezionati.splice(state.selezionati.indexOf(this.id), 1);
    }
    if (this.quantity === 0 && qty > 0) {
      state.selezionati.push(this.id);
    }
    this.quantity = qty;
    this.render(this.element.style.order);
    this.renderSelezionato();
  }

  setOrder(order) {
    this.element.style.order = order;
  }

  hide() {
    this.element.remove();
  }

  render(int) {
    const order = int || 0;

    if (this.element === undefined) {
      const template = document.createElement('template');
      template.innerHTML = state.cartellinoHtml;
      this.element = template.content.firstChild;
    }

    this.element.setAttribute('element_id', this.id);
    this.element.style.order = order;
    this.element.querySelector('[role="crt_nome"]').innerHTML = this.nome;
    this.element.querySelector('[role="crt_requisiti"]').innerHTML = this.requisiti;
    this.element.querySelector('[role="crt_fattura"]').innerHTML = this.fattura;
    this.element.querySelector('[role="crt_descrizione"]').innerHTML = this.descrizione;
    this.element.querySelector('[role="crt_qty"]').value = this.quantity;

    if (!this.listenerDone) {
      this.element.querySelector('[role="crt_qty"]').addEventListener('keyup', (e) => {
        this.setQuantity(e.target.value);
      });
      this.element.querySelector('[role="crt_plus"]').addEventListener('click', () => { this.plusOne(); });
      this.element.querySelector('[role="crt_minus"]').addEventListener('click', () => { this.minusOne(); });
      this.element.querySelector('[role="crt_plus5"]').addEventListener('click', () => { this.plusFive(); });
      this.element.querySelector('[role="crt_minus5"]').addEventListener('click', () => { this.minusFive(); });
      this.listenerDone = true;
    }
    return this.element;
  }

  renderSelezionato() {
    const order = -1 * this.quantity;

    if (this.selezionato === undefined) {
      const template = document.createElement('template');
      template.innerHTML = state.selezionatoHtml;
      this.selezionato = template.content.firstChild;
      document.getElementById('to_print_list').appendChild(this.selezionato);
    }

    if (this.quantity < 1) {
      this.selezionato.remove();
    } else {
      this.selezionato.setAttribute('element_id', this.id);
      this.selezionato.style.order = order;
      this.selezionato.querySelector('[role="crt_nome"]').innerHTML = this.nome;
      this.selezionato.querySelector('[role="crt_requisiti"]').innerHTML = this.requisiti;
      this.selezionato.querySelector('[role="crt_fattura"]').innerHTML = this.fattura;
      this.selezionato.querySelector('[role="crt_descrizione"]').innerHTML = this.descrizione;
      this.selezionato.querySelector('[role="qty"]').innerText = this.quantity;
    }
  }
}
