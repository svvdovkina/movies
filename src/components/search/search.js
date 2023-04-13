import { DivComponent } from "../../common/div-component";
import "./search.css"

export class Search extends DivComponent {
    constructor(state) {
        super();
        this.state = state;
    }

    search() {
        const val = this.el.querySelector("input").value;
        this.state.searchQuery = val;
    }

    render() {
        this.el.classList.add("search-bar");
        this.el.innerHTML = `
        <div class="search-wrapper">
            <img src="static/search.svg" alt="search-pic" />
            <input 
                type="text" 
                placeholder="Search movie..."
                class="search-input"
                value="${this.state.searchQuery ? this.state.searchQuery :''}"
            />
        </div>
        <button class="search-but">
            <img src="static/search-white.svg" alt="search-pic" />
        </button>`;
        this.el.querySelector('.search-but').addEventListener('click', ()=>this.search());
        this.el.querySelector('input').addEventListener('keydown', (e)=>{
            if (e.key === "Enter") {
                e.preventDefault();
                this.search();
            }
        });

   
        return this.el
    }
}