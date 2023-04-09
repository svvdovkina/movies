import { AbstractView } from "../../common/view.js"
import onChange from 'on-change'
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";

export class MainView extends AbstractView {
    
    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        page: 0
    };
    
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle("Movies search");
    }

    async loadList(title="Batman", page=1) {
        const req = await fetch(`https://www.omdbapi.com/?apikey=21647379&s=${title}&page=${page}`);
        return req.json();
        
    }

    async stateHook(path){
        if (path == 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery);
            console.log(data);
            this.state.loading = false;
            this.state.list = data;
        }
        
    }

    appStateHook(path) {
        console.log(path);
        if (path == 'favorites' ) {
            this.render()
        }
    }

    render() {
        const main = document.createElement('div');
        main.append(new Search(this.state).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}