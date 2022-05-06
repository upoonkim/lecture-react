
import { createNextId } from "./helpers.js";

const tag = "[Store]";

export default class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;
    
    this.searchKeyword = "";
    this.searchResult = [];
   
  }

  search(keyword){
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(product => product.name.includes(keyword));   // 조건에 맞는 애들을 배열로 리턴
  }

  
}
