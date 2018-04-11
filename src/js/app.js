import { state } from './js/state.js';
import { Cartellino } from './js/cartellino.js';
import { ListaCartellini } from './js/lista_cartellini.js';
//import data from './data/data.json';

state.index.addField('nome');
state.index.addField('descrizione');
state.index.setRef('id');

let data = {
    1: {
        "id": 1,
        "nome": "cartellino 1",
        "requisiti": "requisiti 1",
        "fattura": "fattura",
        "tipo": 1,
        "colore": 1,
        "descrizione": "bla bla bla",
        "campagna" : 1
    },
    2: {
        "id": 2,
        "nome": "cartellino 2",
        "requisiti": "requisiti 2",
        "fattura": "fattura 2",
        "tipo": 1,
        "colore": 1,
        "descrizione": "bla bla bla 2",
        "campagna" : 1
    }
};

for (let key = 1; key < 500; key ++){
    let element = data[(key%2)+1];
    state.cartellini[key] = new Cartellino({
        id: key,
        nome: element.nome, 
        descrizione: element.descrizione, 
        tipo: element.tipo, 
        colore: element.colore, 
        campagna: element.campagna, 
        requisiti: element.requisiti, 
        fattura: element.fattura
    });
}

state.lista = new ListaCartellini();


















/*const PDFDocument = require('pdfkit');
const fs = require('fs');
const shell = require('electron').shell;
const path = require('path');
const elunr = require('elasticlunr');

var Datastore = require('nedb') , db = new Datastore({ filename: './data/datafile', autoload: true });


document.getElementById('b1').addEventListener('click', (e)=>{
    let doc = new PDFDocument({
        autoFirstPage: false,
    });

    let randomFileName = './output.pdf'
    doc.pipe(fs.createWriteStream(randomFileName));

    let data = [
        {
            nome: 'cartellino',
            colore: 'bianco',
            fattura: 'buona fattura',
            requisiti: 'arte del fabbro',
            descrizione: 'una cartellino del piffero'
        },
        {
            nome: 'cartellino1',
            colore: 'bianco',
            fattura: 'buona fattura',
            requisiti: 'arte del fabbro',
            descrizione: 'una cartellino del piffero 1'
        },
        {
            nome: 'cartellino buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura',
            colore: 'bianco',
            fattura: 'buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura',
            requisiti: 'arte del fabbro buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura',
            descrizione: 'una cartellino del piffero buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fattura buona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fatturabuona fattura'
        },
        {
            nome: 'cartellino1',
            colore: 'bianco',
            fattura: 'buona fattura',
            requisiti: 'arte del fabbro',
            descrizione: 'una cartellino del piffero 1'
        },
        {
            nome: 'cartellino2',
            colore: 'rosso',
            fattura: 'ottima fattura',
            requisiti: 'arte del fabbro',
            descrizione: 'una cartellino del piffero 2'
        },
    ];

    //A4 size 595.28, 841.89
    let pageProperty = {
        margins: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    };
    doc.addPage(pageProperty);

    doc.font('./fonts/Gabriola.ttf').fontSize(8);
    let i = 0;

    let x = 30.64;
    let y = 18.63;
    let first = true;
    let old_colore = null;
    data.forEach((t, i) => {
        //180x252 points = 2.5x3.5 inch
        
        if(!first){
            if(i%3 == 0){
                x = 30.64;
                y += 252;
            }else{
                x += 180;
            }
            
            if(i%9==0 || t.colore != old_colore){
                y = 28.63;
                x = 18.63;
                doc.addPage(pageProperty);
                doc.text(t.colore, 5, 5);
            }
        }else{
            first = false;
            doc.text(t.colore, 5, 5);
        }
        old_colore = t.colore;

        

        let ox = 5;
        let oy = 5;

        doc.image('./images/logo.png', x + 147, y + 2, {width: 30, height: 34});

        let textOption = {width: 150, height: 5};
        doc.text(t.fattura, x + ox, y + oy, textOption);
        
        oy += 10;
        doc.text(t.requisiti, x + ox, y + oy, textOption);

        oy += 15;
        let nameOption = {};
        nameOption.width = 170;
        nameOption.height = 30;
        nameOption.align = 'center';
        doc.fontSize(15).text(t.nome, x + ox, y + oy, nameOption);

        oy += 25;
        textOption.width = 170;
        textOption.height = 190;
        doc.fontSize(8).text(t.descrizione, x + ox, y + oy, textOption);

        doc.image('./images/barra.png', x + 10, y + 240, {width: 160, height: 7});
        doc.rect(x, y, 180, 252).stroke();
    });

    doc.end();
    shell.openItem(path.join(randomFileName));
});
*/