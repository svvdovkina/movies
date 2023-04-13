import { DivComponent } from "../../common/div-component";
import "./card.css"

export class Card extends DivComponent{
    constructor(info, appState) {
        super()
        this.info = info;
        this.appState = appState;
        //console.log('in card', info);
    }

    handleFavorires() {
        const id = this.info.imdbID;
        //console.log('IN HANDLE FAV', title);
        if (this.appState.favorites.has(id)) {
            this.appState.favorites.delete(id);
        } else {
            this.appState.favorites.add(id);
        }
    }

    render() {
        this.el.classList.add("card");
        //console.log(this.info);
        if (!this.info) return this.el;
        const title = this.info.Title;
        const id = this.info.imdbID;
        const inFavorites = this.appState.favorites.has(id)
        this.el.innerHTML = `
        <img class="card-img" src="${this.info.Poster}" alt="${title} image" />
        <div class="card-descr">
            <p class="card-title">${title}</p>
            <p className="card-year">${this.info.Year}</p>
            <button class="card-fav ${inFavorites ? "card-in-fav":''}" ">
                <img src="static/${inFavorites ?'fav.svg' : 'fav-white.svg'}" alt="favorite" />
            </button>
        </div>`
            
        this.el.querySelector(".card-fav").addEventListener('click', this.handleFavorires.bind(this));

        return this.el
    }

}