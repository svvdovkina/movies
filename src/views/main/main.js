import { AbstractView } from "../../common/view.js"
import onChange from 'on-change'
import { Header } from "../../components/header/header.js";

export class MainView extends AbstractView {
    
    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0
    };
    
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle("Movies search");
    }

    appStateHook(path) {
        console.log(path);
        if (path =='favorites' ) {
            this.render()
        }
    }

    render() {
        const main = document.createElement('div');
        main.innerText = `Favorite movies: ${this.appState.favorites.length}`;
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}