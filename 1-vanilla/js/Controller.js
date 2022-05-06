

const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView, searchResultView}) {
    console.log(tag, "constructor");
    this.store = store;

    this.searchFormView = searchFormView;
    this.serchResultView = searchResultView;

    this.subscribeViewEvents()

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
    console.log(tag + "reset click!")
  }

  render() {
    if (this.store.searchKeyword.length > 0)
    {

      this.searchResultView.show(this.store.searchResult);
      return;
    }

    this.searchResultView.hide();
  }

}
