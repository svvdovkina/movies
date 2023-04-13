import { DivComponent } from "../../common/div-component";
import "./moviePage.css";

export class MoviePage extends DivComponent {
    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }

    handleFavorites() {
        const id = this.state.info.imdbID;
        //console.log('IN HANDLE FAV', title);
        if (this.appState.favorites.has(id)) {
            this.appState.favorites.delete(id);
        } else {
            this.appState.favorites.add(id);
        }
    }

    render() {
        const info = JSON.parse(JSON.stringify(this.state.info));
        if (this.state.loading) {
            this.el.innerHTML = "<h3>Loading...</h3>";
            return this.el;
        } 
        const isFav = this.appState.favorites.has(this.state.id);
        this.el.classList.add("movie-page");
        this.el.innerHTML = `
        <h1>${info.Title}</h1>
        <div class="poster-info">
            <img src=${info.Poster} alt="Movie Cover" />
            <div class="short-info">
                <p>Director: <span> ${info.Director}</span></p>
                <p>Year: <span>${info.Year}</span></p>
                <p>Actors:<span> ${info.Actors}</span></p>
                <p>Genre: <span>${info.Genre}</span></p>
                <p>Country: <span>${info.Country}</span></p>
                <button class=${isFav ? "but-remove" : "but-add"}>${isFav ? "Remove from favorites":"Add to favorites"}</button>
            </div>
        </div>
        <div class="descr">
            <h4>Description:</h4>
            <p>${info.Plot}</p>
        </div>
        `;

        const favButton = this.el.querySelector(".short-info button");
        favButton.addEventListener('click', this.handleFavorites.bind(this));

        return this.el;
        
    }



}