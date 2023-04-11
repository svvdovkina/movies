import { DivComponent } from "../../common/div-component";
import "./card.css"

export class Card extends DivComponent{
    constructor(info) {
        super()
        this.info = info;
        //console.log('in card', info);
    }

    render() {
        this.el.classList.add("card");
        //console.log(this.info);
        if (this.info) {
            this.el.innerHTML = `
            <img class="card-img" src="${this.info.Poster}" alt="${this.info.Title} image" />
            <div class="card-descr">
                <p class="card-title">${this.info.Title}</p>
                <p className="card-year">${this.info.Year}</p>
                <button class="card-fav">
                    <img src="static/fav-white.svg" alt="favorite" />
                </button>
            </div>`
            
        }
        return this.el
    }

}