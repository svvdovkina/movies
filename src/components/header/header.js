import { DivComponent } from "../../common/div-component";
import './header.css'

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.classList.add('header');
        //console.log(this.appState.favorites);
        this.el.innerHTML = ` 
        <div id="header">
            <div class="logo">
                <img src="static/logo.svg" alt="logo" />
            </div>
            <div class="menu">
                <a class="search" href="#">
                    <img src="static/search.svg" alt="search" />
                    <span>Movies search</span>
                </a>
                <a class="fav-block" href="#fav">
                    <img src="static/fav.svg" alt="favorites" />
                    <span>Favorites</span>
                    <div class="fav-num"><span>${this.appState.favorites.size}</span></div>
                </a>
            </div>
        </div>`
        return this.el
    }
    
}