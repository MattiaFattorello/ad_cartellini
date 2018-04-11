import { state } from './state.js';

export class ListaCartellini {
    constructor(){
        this.search = document.getElementById('search_bar');
        this.search.addEventListener('search', () => { this.searchElement(); });
        this.result = undefined;
        this.list = document.getElementById('lista_cartellini');
        this.render()
    }

    searchElement(){
        let search_key = this.search.value;
        if(search_key == ""){
            this.clear();
            return;
        } else {
            this.result = [];
            let result_temp = state.index.search(search_key, {expand: true});
            for(let key in result_temp){
                this.result.push(result_temp[key].ref);
            }
        }
        this.render();
    }

    clear(){
        this.search.value = "";
        this.result = undefined;
        this.render();
    }

    render(){
        if(this.result === undefined){
            for(let key in state.cartellini){
                let order = key;
                if(state.cartellini[key].quantity > 0 && state.cartellini[key].quantity != ""){
                    order = -1*state.cartellini[key].quantity;
                }
                window.setTimeout(()=>{this.list.appendChild(state.cartellini[key].render(order));}, 500);
            }
        }else{
            for(let key in state.cartellini){
                let order = this.result.indexOf(key);
                if(order < 0){
                    window.setTimeout(()=>{state.cartellini[key].hide();}, 500);
                }else{
                    window.setTimeout(()=>{state.cartellini[key].setOrder(order);}, 500);
                }
            }
        }
    }
}