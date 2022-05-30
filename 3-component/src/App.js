import React from "react";
import Header from "./components/Header.js"
import SearchForm from "./components/SearchForm.js"
import SearchResult from "./components/SearchResult.js"
import Tabs, { TabType } from "./components/Tabs.js"
import store from "./Store.js"
import KeywordList from "./components/KeywordList.js"
import HistoryList from "./components/HistoryList.js";

export default class App extends React.Component{
    constructor(){
        super();

        this.state = {
            searchKeyword: "",
            searchResult: [],
            submitted: false,
            selectedTab: 'KEYWORD',
        }
    }

    search(searchKeyword){
        const searchResult=store.search(searchKeyword)
        console.log(searchKeyword);
        this.setState({searchKeyword, searchResult, submitted: true});
    }


    handleChangeInput(searchKeyword){
        if(searchKeyword <= 0){
            this.clickReset();
        }
        this.setState({searchKeyword},()=>{console.log(this.state.searchKeyword);})

    }

    clickReset(){
        console.log("click Reset");
        this.setState({searchKeyword: "",
                        searchResult: [], submitted: false});

    }

    selectedTab(newTab){
        this.setState({selectedTab: newTab})

    }
    render(){
        
        const {searchKeyword, submitted, searchResult, selectedTab} = this.state

        return (
        <>
        <Header title="검색"/>;
        <div className="container">
            <SearchForm 
            value={this.state.searchKeyword}
            onChange={(value)=>this.handleChangeInput(value)}
            onSubmit={()=>this.search(searchKeyword)} onReset={()=>this.clickReset()}/>
        </div>
        <div className="content">
            {submitted ? <SearchResult data={searchResult}/> : (
            <> 
                <Tabs
                 selectedTab={this.state.selectedTab}
                    onSelect={(newTab)=>this.selectedTab(newTab)}
            />
            {selectedTab === TabType.KEYWORD && <KeywordList onClick={keyword=>this.search(keyword)} />}
            {selectedTab === TabType.HISTORY && <HistoryList onClick={keyword=>this.search(keyword)}/>}
            </>
        )}
        </div>
        </>
        )
    }

}