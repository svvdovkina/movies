import './app.css';
import { MainView } from './views/main/main.js';

class App {
    routes = [
        {path: "", view: MainView}
    ];

    appState = {
        favorites: new Set(['D&D', 'When Harry Met Sally...'])
    }

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        console.log('------', location.hash);
        const view = this.routes.find(r => r.path == location.hash).view;
        this.currentView = new view(this.appState);
        this.currentView.render()
    }
}

new App();