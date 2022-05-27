import { formatRelativeDate } from "./helpers.js";
import storage from "./storage.js";

const tag = "[Store]";

class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;
 
    
   
  }

  search(keyword){
    this.storage.historyData.push({id: this.storage.historyData.length+1 , keyword: keyword, date: formatRelativeDate()});
    return this.searchResult = this.storage.productData.filter(product => product.name.includes(keyword));   // 조건에 맞는 애들을 배열로 리턴
  }

  getKeywordList(){
    return this.storage.keywordData;
  }

  getHistoryList(){
    return this.storage.historyData.sort(this._sortHistoryList);
  }

  _sortHistoryList(history1, history2){
    return history2.date > history1.date;
  }
  removeHistory(keyword){
    this.storage.historyData = this.storage.historyData.filter((history)=> history.keyword !== keyword)
  }

}

const store = new Store(storage);
export default store;