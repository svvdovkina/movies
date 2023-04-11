import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import "./list.css"

export class List extends DivComponent{
    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }

    render() {
        if (this.state.loading) {
            this.el.innerHTML = "<h3>Loading...</h3>";
            return this.el;
        } 
        this.el.classList.add("list");
        //console.log('in list render',this.state.found);
        this.el.innerHTML = `
        <h3>Search result: ${this.state.found} movies found</h3>
        <div class="mov-list"></div>
        `;
        //console.log('in list render', JSON.parse(JSON.stringify(this.state.list)));
        const list = JSON.parse(JSON.stringify(this.state.list));
        const div = this.el.querySelector(".mov-list");
    
        for (const cardInfo of list) {
            div.append(new Card(cardInfo, this.appState).render());
        }
    
        return this.el
    }
}