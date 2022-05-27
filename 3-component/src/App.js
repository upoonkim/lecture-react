import React from "react";
import Header from "./components/Header.js"
import SearchForm from "./components/SearchForm.js"
import SearchResult from "./components/SearchResult.js"
import Tabs from "./components/Tabs.js"
import store from "./Store.js"
 
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

        this.setState({searchResult, submitted: true});
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
        
        const {searchKeyword, submitted, searchResult} = this.state

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
            {submitted ? <SearchResult data={searchResult}/> : <Tabs selectedTab={this.state.selectedTab} onSelect={(newTab)=>this.selectedTab(newTab)}/>}
        </div>
        </>
        )
    }

}