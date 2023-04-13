import './app.css';
import { FavoritesView } from './views/favorites/favorites';
import { MainView } from './views/main/main.js';
import { MovieView } from './views/movie/movie';

class App {
    routes = [
        {path: "", view: MainView},
        {path: "#fav", view: FavoritesView},
        {path: "#movie", view: MovieView}
    ];

    getFavorites() {
        const fav = localStorage.getItem("favorites");
        //console.log("FAV LOAD", JSON.parse(fav), new Set(JSON.parse(fav)));
        return fav? new Set(JSON.parse(fav)): new Set([])
    }

    appState = {
        favorites: this.getFavorites()
    }

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
    }

    getView(path) {
        const mainHash = location.hash.split('?')[0];
        return mainHash == path ? true : false
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        
        //console.log('------', location.hash);
        const view = this.routes.find(r => this.getView(r.path)).view;
        //console.log(view);
        
        this.currentView = new view(this.appState);
        this.currentView.render()
    }
}

new App();