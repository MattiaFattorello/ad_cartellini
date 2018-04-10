import { state } from './state.js';

export class ListaCartellini {
    constructor(){
        console.log("init lista")
        this.element = document.getElementById('search_bar');
        this.clearBtn = document.getElementById('clear_btn');
        this.element.addEventListener('keyup', () => { this.searchElement(); });
        this.result = undefined;
        this.render()
    }

    searchElement(){
        console.log("callback");
        let search_key = this.element.value;
        console.log("search_key");
        if(search_key == ""){
            this.clear();
            return;
        } else {
            this.result = state.index.search(search_key, {expand: true});
            console.log(this.result);
        }
        this.render();
    }

    clear(){
        this.element.value = "";
        this.result = undefined;
        this.render();
    }

    showClear(){
        this.clearBtn.style.display = '';
        this.clearBtn.addEventListener('click', this.clear);
    }

    hideClear(){
        this.clearBtn.style.display = 'none';
        this.clearBtn.removeEventListener('click', this.clear);
    }

    render(){
        const list = document.getElementById('lista_cartellini');
        list.innerHTML = "";
        if(this.result === undefined){
            this.hideClear();
            for(let key in state.cartellini){
                list.appendChild(state.cartellini[key].render());
            }
        }else{
            for( let key in this.result) {
                list.appendChild(state.cartellini[this.result[key].ref].render());
            }
            this.showClear();
        }
    }
}