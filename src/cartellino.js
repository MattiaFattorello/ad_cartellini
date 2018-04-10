import { state } from './state.js';

export class Cartellino {
    constructor(id, nome, descrizione, tipo, colore, campagna, args) {
        if(id === undefined){
            state.next_id--;
            this.id = state.next_id;
        }else{
            this.id = id;
        }        
        this.nome = nome;
        this.descrizione = descrizione;
        this.campagna = campagna;
        this.colore = colore;
        this.tipo = tipo;
        this.requisiti = args.requisiti || ""; 
        this.fattura = args.fattura || "";
        this.immagine = args.immagine || "";
        this.link = args.link || "";  
        this.element = undefined;
        this.quantity = 0;
        this.listenerDone = false;

        state.index.addDoc({
            "id": this.id,
            "nome": this.nome,
            "descrizione": this.descrizione
        });
    }

    plusOne(){
        this.quantity++;
        if(this.quantity == 1){
            state.selezionati[this.id] = {quantity: this.quantity};    
        }else{
            state.selezionati[this.id].quantity = this.quantity;
        }
        this.render();
    }

    minusOne(){
        this.quantity--;
        if(this.quantity === 0){
            delete state.selezionati[this.id];
        } else {
            state.selezionati[this.id].quantity = this.quantity;
        }
        this.render();
    }

    setQuantity(qty){
        this.quantity = qty;
        if(this.quantity === 0){
            delete state.selezionati[this.id];
        } else {
            state.selezionati[this.id].quantity = this.quantity;
        }
        this.render();
    }

    render(){
        if(this.element === undefined){
            let template = document.createElement('template');
            template.innerHTML = state.cartellinoHtml;
            this.element = template.content.firstChild;

        }

        this.element.setAttribute('element_id', this.id);
        this.element.querySelector('[role="crt_nome"]').innerHTML = this.nome;
        this.element.querySelector('[role="crt_descrizione"]').innerHTML = this.descrizione;
        this.element.querySelector('[role="crt_qty"]').value = this.quantity;
        
        if(!this.listenerDone){
            this.element.querySelector('[role="crt_qty"]').addEventListener('submit', () => {
                let element_id = this.parentElement.parentElement.getAttibute('element_id');
                state.cartellini.element_id.setQuantity(this.value);
            });
            this.element.querySelector('[role="crt_plus"]').addEventListener('click', () => {this.plusOne()});
            this.element.querySelector('[role="crt_minus"]').addEventListener('click', () => {this.minusOne()});    
            this.listenerDone = true;
        }
        return this.element;
    }
}