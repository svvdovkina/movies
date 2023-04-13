import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { MoviePage } from "../../components/moviePage/moviePage";

export class MovieView extends AbstractView {

    state = {
        "loading": false,
        "id" : this.setId(),
        "info": [],
        "reload": false
    }

    constructor(appState) {
        super();

        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle("Movie info");
        this.state.reload = true;
    }

    setId(){
        const id = location.hash.split('?id=')[1].slice(1, -1);
        //console.log('IN MOVIES ID', id, id[0], id[1]);
        return id
    }

    async loadMovie() {
        const req = await fetch(`https://www.omdbapi.com/?apikey=21647379&i=${this.state.id}`);
        return req.json()
    }

    async stateHook(path) {
        //console.log("STATE chenged", path);
        if (path == "reload") {
            this.state.loading = true;
            const data = await this.loadMovie();
            this.state.info = data;
            this.state.loading = false;
            //console.log(this.state.info)
        }
        if (path == "loading") {
            this.render();
        }
    }

    appStateHook(path) {
        if (path == 'favorites' ) {
            this.state.reload = !this.state.reload;
            localStorage.setItem("favorites", JSON.stringify([...this.appState.favorites]));
        }
    }

    render() {
        const moviePage = document.createElement('div');
       moviePage.append(new MoviePage(this.state, this.appState).render());
        this.app.innerHTML = '';
        this.app.append(moviePage);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

    destroy() {
        //super();
        onChange.unsubscribe(this.appState);
    }
}