const state = require.main.require('./js/state.js');
const Cartellino = require.main.require('./js/cartellino.js');
const ListaCartellini = require.main.require('./js/lista_cartellini.js');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const shell = require('electron').shell;
const path = require('path');
const dialog = require('electron').remote.dialog;
const app = require('electron').remote.app;


state.index.addField('nome');
state.index.addField('descrizione');
state.index.setRef('id');

/* const data = {
  1: {
    id: 1,
    nome: 'cartellino 1',
    requisiti: 'requisiti 1',
    fattura: 'fattura',
    tipo: 1,
    colore: 1,
    descrizione: 'bla bla bla',
    campagna: 1,
  },
  2: {
    id: 2,
    nome: 'cartellino 2',
    requisiti: 'requisiti 2',
    fattura: 'fattura 2',
    tipo: 1,
    colore: 1,
    descrizione: 'bla bla bla 2',
    campagna: 1,
  },
};

for (let key = 1; key < 500; key++) {
  const element = data[(key % 2) + 1];
  state.cartellini[key] = new Cartellino({
    id: key,
    nome: element.nome,
    descrizione: element.descrizione,
    tipo: element.tipo,
    colore: element.colore,
    campagna: element.campagna,
    requisiti: element.requisiti,
    fattura: element.fattura,
  });
} */

state.lista = new ListaCartellini();

function hasClass(el, className) {
  if (el.classList) { return el.classList.contains(className); }
  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
  }
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

function toggle(el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
}

function toggleParent(el, className) {
  toggle(el.parentNode, className);
}

// const elunr = require('elasticlunr');
// var Datastore = require('nedb'),
// db = new Datastore({ filename: './data/datafile', autoload: true });

document.getElementById('print').addEventListener('click', (e) => {
  if (state.selezionati.length < 1) {
    e.preventDefault();
    return;
  }
  dialog.showSaveDialog({ filters: [
    { name: 'PDF', extensions: ['pdf'] },
    { name: 'All Files', extensions: ['*'] }] }
  , (fileName) => {
    const doc = new PDFDocument({
      autoFirstPage: false,
    });

    doc.pipe(fs.createWriteStream(fileName));

      // A4 size 595.28, 841.89
    const pageProperty = {
      margins: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    };
    doc.addPage(pageProperty);

    doc.font(app.getAppPath() + '/src/fonts/Gabriola.ttf').fontSize(8);
    let i = 0;

    let x = 30.64;
    let y = 18.63;
    let first = true;
    let oldColor = null;

    state.selezionati.forEach((el) => {
          // 180x252 points = 2.5x3.5 inch
      const t = state.cartellini[el];
      for (let q = 0; q < t.quantity; q++) {
        if (!first) {
          if (i % 3 === 0) {
            x = 30.64;
            y += 252;
          } else {
            x += 180;
          }

          if (i % 9 === 0 || t.colore !== oldColor) {
            doc.addPage(pageProperty);
            x = 30.64;
            y = 18.63;
            doc.text(t.colore, 5, 5);
          }
        } else {
          first = false;
          doc.text(t.colore, 5, 5);
        }
        oldColor = t.colore;

        const ox = 5;
        let oy = 5;

        doc.image(app.getAppPath() + '/src/img/logo.png', x + 147, y + 2, { width: 30, height: 34 });

        const textOption = { width: 150, height: 5 };
        doc.text(t.fattura, x + ox, y + oy, textOption);

        oy += 10;
        doc.text(t.requisiti, x + ox, y + oy, textOption);

        oy += 15;
        const nameOption = {};
        nameOption.width = 170;
        nameOption.height = 30;
        nameOption.align = 'center';
        doc.fontSize(15).text(t.nome, x + ox, y + oy, nameOption);

        oy += 25;
        textOption.width = 170;
        textOption.height = 190;
        doc.fontSize(8).text(t.descrizione, x + ox, y + oy, textOption);

        doc.image(app.getAppPath() + '/src/img/barra.png', x + 10, y + 240, { width: 160, height: 7 });
        doc.rect(x, y, 180, 252).stroke();
        i += 1;
      }

      t.setQuantity(0);
    });

    doc.end();
    shell.openItem(path.join(fileName));
  });
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const el = e.target.elements;
  const c = new Cartellino({
    nome: el.nome.value,
    descrizione: el.descrizione.value,
    // tipo: el.tipo.value,
    colore: el.colore.value,
    // campagna: el.campagna.value,
    requisiti: el.requisiti.value,
    fattura: el.fattura.value,
  });
  state.cartellini[c.id] = c;

  e.target.reset();
  state.lista.render();
});
