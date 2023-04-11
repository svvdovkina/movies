import './app.css';
import { FavoritesView } from './views/favorites/favorites';
import { MainView } from './views/main/main.js';

class App {
    routes = [
        {path: "", view: MainView},
        {path: "#fav", view: FavoritesView}
    ];

    getFavorites() {
        const fav = localStorage.getItem("favorites");
        console.log("FAV LOAD", JSON.parse(fav), new Set(JSON.parse(fav)));
        return fav? new Set(JSON.parse(fav)): new Set([])
    }

    appState = {
        favorites: this.getFavorites()
    }

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        //console.log('------', location.hash);
        const view = this.routes.find(r => r.path == location.hash).view;
        
        this.currentView = new view(this.appState);
        this.currentView.render()
    }
}

new App();