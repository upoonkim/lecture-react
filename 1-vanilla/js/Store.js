import { formatRelativeDate } from "./helpers.js";
import { TabType } from "./views/TabView.js";

const tag = "[Store]";

export default class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;
    
    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
   
  }

  search(keyword){
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(product => product.name.includes(keyword));   // 조건에 맞는 애들을 배열로 리턴
    this.storage.historyData.push({id: this.storage.historyData.length+1 , keyword: keyword, date: formatRelativeDate()});
  }

  getKeywordList(){
    return this.storage.keywordData;
  }

  getHistoryList(){
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(history1, history2){
    return history2.date > history1.date;
  }
  
  removeHistory(keyword){
    this.storage.historyData = this.storage.historyData.filter((history)=> history.keyword !== keyword)
  }

}
