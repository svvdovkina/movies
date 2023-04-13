import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import "./list.css"

export class List extends DivComponent{
    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }

    updatePage(value){
        this.state.page += value;
    }

    render() {
        if (this.state.loading) {
            this.el.innerHTML = "<h3>Loading...</h3>";
            return this.el;
        } 
        this.el.classList.add("list");
        const totPages = Math.ceil(this.state.found / 10);
        const curPage = this.state.page;
        //console.log('in list render',this.state.found);
        this.el.innerHTML = `
        <h3> ${this.state.found} movies found</h3>
        <div class="mov-list"></div>
        <div class="prev-next">
            <button class="but-prev">Previous page</button>
            <p> Page ${curPage}/${totPages}</p>
            <button class="but-next">Next page</button>
        </div>
        `;
        //console.log('in list render', JSON.parse(JSON.stringify(this.state.list)));
        const list = JSON.parse(JSON.stringify(this.state.list));
        const div = this.el.querySelector(".mov-list");
    
        for (const cardInfo of list) {
            div.append(new Card(cardInfo, this.appState).render());
        }

        const prevBut = this.el.querySelector(".but-prev");
        if (curPage == 1) prevBut.disabled = true;
        prevBut.addEventListener('click', ()=>this.updatePage(-1))
        const nextBut = this.el.querySelector(".but-next");
        if (curPage == totPages) nextBut.disabled = true;
        nextBut.addEventListener('click', ()=>this.updatePage(1))

        return this.el
    }
}