import React from 'react';
import List from './List.js';
import store from  '../Store.js'
import { formatRelativeDate } from '../helpers';

export default class HistoryList extends List {
    componentDidMount(){
        const data = store.getHistoryList();
        this.setState({
            data,
        })
    }


    removeBtn(event, keyword){
        event.stopPropagation();
        store.removeHistory(keyword);
        const data = store.getHistoryList();
        this.setState({data});
    }

    renderItem(item){
        return (
                    <>
                    <span className="number">{item.keyword}</span>
                    <span className="date">{formatRelativeDate()}</span>
                    <button className="btn-remove" onClick={(event)=>this.removeBtn(event,item.keyword)}></button>
                    </>
        )
    }
}