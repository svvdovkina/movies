import { AbstractView } from "../../common/view.js"

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
        this.setTitle("Movies search");
    }

    render() {
        const main = document.createElement('div');
        main.innerText = `Favorite movies: ${this.appState.favorites.length}`;
        this.app.innerHTML = '';
        this.app.append(main);
    }
}