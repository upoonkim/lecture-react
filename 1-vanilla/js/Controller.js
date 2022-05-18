

const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView, searchResultView, tabView}) {
    console.log(tag, "constructor");
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.subscribeViewEvents()
    this.render();
  }


  subscribeViewEvents(){
    this.searchFormView.on("@submit", (event)=>this.search(event.detail.value));
    this.searchFormView.on("@reset",()=> this.reset())
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
      this.tabView.hide()
      this.searchResultView.show(this.store.searchResult);
      return;
    }
    console.log(tag + "reset click!")
    // 생각해볼 것! this.tabView.show( ??  );
    this.searchResultView.hide();
  }

}
