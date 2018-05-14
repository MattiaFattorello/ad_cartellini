import { state } from './state.js';

export class Cartellino {
    constructor(args) {
        if(args.id === undefined){
            state.next_id--;
            this.id = state.next_id;
        }else{
            this.id =args.id;
        }
        this.nome = args.nome || "";
        this.descrizione = args.descrizione || "";
        this.campagna = args.campagna || "";
        this.colore = args.colore || "";
        this.tipo = args.tipo || "";
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
        this.render(this.element.style.order);
    }

    plusFive(){
        for(let i=0; i<5; i++){
            this.plusOne();
        }
    }

    minusOne(){
        if(this.quantity > 0){
            this.quantity--;
            if(this.quantity === 0){
                delete state.selezionati[this.id];
            } else {
                state.selezionati[this.id].quantity = this.quantity;
            }
            this.render(this.element.style.order);
        }
    }

    minusFive(){
        for(let i=0; i<5; i++){
            this.minusOne();
        }
    }

    setQuantity(qty){
        this.quantity = qty;
        if(this.quantity === 0){
            delete state.selezionati[this.id];
        } else {
            if(state.selezionati[this.id] === undefined){
                state.selezionati[this.id] = {quantity: this.quantity};    
            }else{
                state.selezionati[this.id].quantity = this.quantity;
            }
        }
        this.render(this.element.style.order);
    }

    setOrder(order){
        this.element.style.order = order;
    }

    hide(){
        this.element.remove();
    }

    render(int){
        let order = int || 0;

        if(this.element === undefined){
            let template = document.createElement('template');
            template.innerHTML = state.cartellinoHtml;
            this.element = template.content.firstChild;

        }

        this.element.setAttribute('element_id', this.id);
        this.element.style.order = order;
        this.element.querySelector('[role="crt_nome"]').innerHTML = this.nome;
        this.element.querySelector('[role="crt_descrizione"]').innerHTML = this.descrizione;
        this.element.querySelector('[role="crt_qty"]').value = this.quantity;
        
        if(!this.listenerDone){
            this.element.querySelector('[role="crt_qty"]').addEventListener('keyup', (e) => {
                this.setQuantity(e.target.value);
            });
            this.element.querySelector('[role="crt_plus"]').addEventListener('click', () => {this.plusOne()});
            this.element.querySelector('[role="crt_minus"]').addEventListener('click', () => {this.minusOne()});
            this.element.querySelector('[role="crt_plus5"]').addEventListener('click', () => {this.plusFive()});
            this.element.querySelector('[role="crt_minus5"]').addEventListener('click', () => {this.minusFive()});
            this.listenerDone = true;
        }
        return this.element;
    }
}