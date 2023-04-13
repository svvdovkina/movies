import { DivComponent } from "../../common/div-component";
import "./card.css"

export class Card extends DivComponent{
    constructor(info, appState) {
        super()
        this.info = info;
        this.appState = appState;
        //console.log('in card', info);
    }

    handleFavorites() {
        const id = this.info.imdbID;
        //console.log('IN HANDLE FAV', title);
        if (this.appState.favorites.has(id)) {
            this.appState.favorites.delete(id);
        } else {
            this.appState.favorites.add(id);
        }
    }

    addId(e) {
        const favImg = this.el.querySelector(".card-fav>img");
        const favButton = this.el.querySelector(".card-fav");
        
        if (e.target == favButton || e.target == favImg) {
            e.preventDefault();
            return false
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
        <a href="#movie?id='${id}'">
            <img class="card-img" src="${this.info.Poster}" alt="${title} image" />
            <div class="card-descr">
                <p class="card-title">${title}</p>
                <p className="card-year">${this.info.Year}</p>
                <button class="card-fav ${inFavorites ? "card-in-fav":''}" ">
                    <img src="static/${inFavorites ?'fav.svg' : 'fav-white.svg'}" alt="favorite" />
                </button>
            </div>
        </a>`
       
        this.el.querySelector(".card-fav").addEventListener('click', this.handleFavorites.bind(this));
        this.el.querySelector("a").addEventListener('click', this.addId.bind(this) );

        return this.el
    }

}