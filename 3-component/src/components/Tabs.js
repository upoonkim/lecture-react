import React from "react"

export const TabType = {
    KEYWORD: 'KEYWORD',
    HISTORY: 'HISTORY'
}

const TabLabel = {           // 출력 용 label
    [TabType.KEYWORD]: '추천 검색어',
    [TabType.HISTORY]: '최근 검색어'
}

const Tabs = ({selectedTab, onSelect}) => {


    const clickTab = (tabType)=>{
        onSelect(tabType);
    }

    return (
        <>
            <ul className="tabs">
                {Object.values(TabType).map((tabType) => {
                    return <li key={tabType} className={selectedTab === tabType ? "active" : ""} onClick={()=>clickTab(tabType)}>{TabLabel[tabType]}</li>
                })}
            </ul>
        </>
    )
}//  {this.state.selectedTab === TabType.KEYWORD ? keywordList : historyList}

export default Tabs;