import { TabType } from "./views/TabView.js";


const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView, searchResultView, tabView, keywordListView, historyListView}) {
    console.log(tag, "constructor");
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;

    this.subscribeViewEvents()
    this.render();   // 그리는 함수
  }


  subscribeViewEvents(){
    this.searchFormView.on("@submit", (event)=>this.search(event.detail.value));
    this.searchFormView.on("@reset",()=> this.reset())

    this.tabView.on('@change', (event) => this.changeTab(event.detail.value));

    this.keywordListView.on('@click', (event) => this.clickKeyword(event.detail.value));

    this.historyListView.on('@click', (event) => this.clickKeyword(event.detail.value)).on("@remove", (event) => this.removeHistory(event.detail.value));
  }

  removeHistory(keyword){
    this.store.removeHistory(keyword);
    this.render();
  }

  clickKeyword(keyword){
    this.search(keyword);
    this.render();
  }

  changeTab(tab){
    this.store.selectedTab=tab;
    console.log("now tab : " + this.store.selectedTab);
    this.render();
  }

  search(keyword){
    console.log(tag + "input: " + keyword + "입니다.");
    this.store.search(keyword);
    this.render();      // 컨트롤러가 관리하고 있는 뷰들을 이용해서 화면에 출력
  }
  
  reset(){
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
    console.log(tag + "reset click!")
  }

  render() {
    if (this.store.searchKeyword.length > 0)
    {
      return this.renderSearchResult();
    }
    console.log(tag + "reset click!")
    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();

    if(this.store.selectedTab === TabType.KEYWORD){
      console.log(this.store.getKeywordList());
      this.keywordListView.show(this.store.getKeywordList())
      this.historyListView.hide();
    } else if (this.store.selectedTab === TabType.HISTORY){
      this.keywordListView.hide();
      this.historyListView.show(this.store.getHistoryList());
    } else{
      throw "사용할 수 없는 탭입니다.";
    }

  }

  renderSearchResult(){
    this.searchFormView.show(this.store.searchKeyword);
    this.tabView.hide();
    this.keywordListView.hide();
    this.historyListView.hide();


    this.searchResultView.show(this.store.searchResult);
  }

}
