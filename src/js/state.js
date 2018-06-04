const elasticlunr = require('elasticlunr');
const app = require('electron').remote.app;
const fs = require('fs');

module.exports = {
  online: false,
  cartellini: {},
  selezionati: [],
  next_id: 0,
  lista: undefined,
  index: elasticlunr(() => {}),
  cartellinoHtml: fs.readFileSync(app.getAppPath() + '/src/html/cartellino.html', 'utf8'),
  selezionatoHtml: fs.readFileSync(app.getAppPath() + '/src/html/selezionato.html', 'utf8'),
};
