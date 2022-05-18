import { qs, qsAll, on } from "../helpers.js"
import View from "./View.js"

export const TabType = {
    KEYWORD: 'KEYWORD',
    HISTORY: 'HISTORY'
}

const TabLabel = {           // 출력 용 label
    [TabType.KEYWORD]: '추천 검색어',
    [TabType.HISTORY]: '최근 검색어'
}

export default class TabView extends View{
    constructor(){
        super(qs('#tab-view'))
        this.template = new Template()
    }

    show(selectedTab){
        this.element.innerHTML = this.template.getTabList()
       //추가한 부분 this.bindEvent()
        qsAll("li", this.element).forEach(li => {li.className = li.dataset.tab===selectedTab ? "active" : "";
    })
        
        super.show()
    }

    bindEvent(){
        on(this.element, "click", ()=>this.handleSelect())
    }

    handleSelect(){
        const { value } = this.element
        this.emit('@select',{value});
    }


}


class Template{               // Object.values 는 객체의 각 values를 뽑아서 배열로 반환해 준다. TanType의 경우엔 ['KEYWORD', 'HISTORY']
    getTabList(){
        console.log("tab!")
        return `
        <ul class="tabs">
            ${Object.values(TabType)               
                .map((tabType) => ({tabType, tabLabel: TabLabel[tabType]}))
                .map(this._getTab)
                .join("")}
        </ul>
        `
    }

    _getTab({tabType, tabLabel}){
        console.log("tabs")
        return `
        <li data-tab="${tabType}">
            ${tabLabel}
        </li>
        `

    }
}