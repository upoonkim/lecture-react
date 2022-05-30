import React from 'react';
import List from './List.js';
import store from '../Store.js'
import { formatRelativeDate } from '../helpers';

export default class HistoryList extends React.Component {
    constructor(){
        super();
        this.state={
            historyList: []
        }
    }
    
    componentDidMount() {
        const historyList = store.getHistoryList();
        this.setState({
            historyList,
        })
    }


    removeBtn(event, keyword) {
        event.stopPropagation();
        store.removeHistory(keyword);
        const historyList = store.getHistoryList();
        this.setState({ historyList });
    }

    render() {
        return (
            <List data={this.state.historyList} onClick={this.props.onClick} renderItem={(item, index) => {

                return (<>
                    <span className="number">{item.keyword}</span>
                    <span className="date">{formatRelativeDate()}</span>
                    <button className="btn-remove" onClick={(event) => this.removeBtn(event, item.keyword)}></button>
                </>
                )
            }} />
        )
    }
}