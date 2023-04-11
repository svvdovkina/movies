import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import onChange from "on-change";
import { List } from "../../components/list/list";

export class FavoritesView extends AbstractView {

    state = {
        "reload": false,
        "loading": false,
        "list" : [],
        "found": 0
    }

    constructor(appState){
        super();
        this.appState = appState;
        //console.log('HERE');
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle("Favourites");
        this.state.reload = true;
    }

    async loadFavorites() {
        const favList = this.appState.favorites;
        let urls = [];
        favList.forEach((title)=>{
            urls.push(`http://www.omdbapi.com/?apikey=21647379&t=${title}`);
        })
        const info = await Promise.all(urls.map(url =>
            fetch(url).then(res => res.json())
        ));
        //console.log('IN LOAD', info);
        return info;
    }

    async stateHook(path) {
        if (path == "reload") {
            this.state.loading = true;
            const data = await this.loadFavorites();
            //console.log('resp ', resp);
            this.state.list = data;
            this.state.found = data.length;
            this.state.loading = false;
            //console.log(this.state.list, this.state.found)
        }
        if (path == "loading") {
            this.render();
        }
    }

    appStateHook(path) {
        //console.log(path);
        if (path == 'favorites' ) {
            this.state.reload = !this.state.reload;
            localStorage.setItem("favorites", JSON.stringify([...this.appState.favorites]));
            //this.render();
            //console.log(this.appState.favorites)
        }
    }

    render() {
        const favPage = document.createElement('div');
        const h1 = document.createElement('h1');
        h1.textContent = "Favorites";
        favPage.append(h1);
        favPage.append(new List(this.state, this.appState).render());
        this.app.innerHTML = '';
        this.app.append(favPage);
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
