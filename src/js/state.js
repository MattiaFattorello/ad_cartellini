const elasticlunr = require('elasticlunr');
const fs = require('fs');

const state = {
    online: false,
    cartellini: {},
    selezionati: {},
    next_id: 0,
    lista: undefined,
    index: elasticlunr(()=>{}),
    cartellinoHtml: fs.readFileSync('./src/html/cartellino.html', 'utf8')
};

export { state };