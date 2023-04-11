import { AbstractView } from "../../common/view.js"
import onChange from 'on-change'
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { List } from "../../components/list/list.js";

export class MainView extends AbstractView {
    
    state = {
        list: [],
        found: 0,
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
            //console.log(data.Search);
            this.state.loading = false;
            this.state.found = data.totalResults;
            this.state.list = data.Search;
            //console.log('load list ',this.state.list, data.Search, this.state.found);
        }
        if ( path == 'list') {
            //console.log('loadING ', this.state.loading,this.state.list, this.state.found);
            this.render();
        }
        
    }

    appStateHook(path) {
        //console.log(path);
        if (path == 'favorites' ) {
            this.render();
            localStorage.setItem("favorites", JSON.stringify([...this.appState.favorites]));
            console.log("LOCAL ST", localStorage.getItem("favorites"))
        }
    }

    render() {
        const main = document.createElement('div');
        main.append(new Search(this.state).render());
        main.append(new List(this.state, this.appState).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

    destroy() {
        //super();
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }
}