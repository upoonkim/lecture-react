// 리액트는 하나의 엘레멘트 단위이기 때문에 <> </> 와 같이 전체를 한번 감싸줘야 한다. 동일 레벨의 여러개 엘리멘트가 존재하면 안된다. 리액트는 루트 노드가 있어야 한다.
// 엘리멘트보다 더 큰 개념이 컴포넌트. 컴포넌트는 UI를 나타내는 엘리먼트와 어플리케이션 로직을 포함한 상위 개념이다.

// 리액트 자채에 있는 컴포넌트를 상속
export const TabType = {
    KEYWORD: 'KEYWORD',
    HISTORY: 'HISTORY'
}

const TabLabel = {           // 출력 용 label
    [TabType.KEYWORD]: '추천 검색어',
    [TabType.HISTORY]: '최근 검색어'
}

import store from "./js/Store.js"
class App extends React.Component {

    constructor() {
        super();

        this.state = {
            searchKeyword: '',
            searchResult: [],
            submitted: false,
            selectedTab: TabType.KEYWORD,
            keywordList: [],
            historyList: [],
        }
    }

    handleChangeInput(event) {
        // this.state.searchKeyword = event.target.value;
        // // this.forceUpdate();    // 컴포넌트 에서는 forceUpdate를 통해 render 함수를 호출한다.  해당 코드는 결국 모델을 바꾸고 컨트롤러를 통해 뷰를 컨트롤 하는것과 다를게 없음.

        if (event.target.value.length <= 0) {
            return this.handleReset();
        }
        this.setState({
            searchKeyword: event.target.value,
        });    // 그래서 리액트 자체에서 상태를 확인하고 render함수를 호출해주는 setState를 사용한다. 리액트에서 컴포넌트의 상태를 바꾸겠다는 직접적인 약속. 스스로 다시 그려야겠다!

    }
    // 리액트의 컴포넌트 클래스는 상태 관리를 위한 내부 변수인 state를 가지고 있다.
    // input 엘리먼트 자체의 상태관리를 사용하지 않고 리액트 컴포넌트가 관리 하는 것을 제어 컴포넌트 라고 한다.

    componentDidMount() {    // 처음에 생성 되면 실행되는 함수
        const keywordList = store.getKeywordList();
        const historyList = store.getHistoryList();
        this.setState({ keywordList: keywordList,
                        historyList: historyList, });
        console.log("comapo")
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('handleSubmit : ', this.state.searchKeyword)
        this.search(this.state.searchKeyword)

    }
    search(searchKeyword) {
        if (searchKeyword.length > 0) {
            const searchResult = store.search(searchKeyword);
            this.setState({ searchResult: searchResult })
            this.setState({ submitted: true });
        }
    }

    handleReset() {
        //this.setState({searchKeyword: ''})       // setState는 비동기로 동작을 한다. 그래서 마지막에 상태를 바꿀려고 해서 console 로그가 찍히고 나서 상태가 바뀌게 된다.
        //console.log(this.state.searchKeyword)

        this.setState(() => {
            return {
                searchKeyword: "",
                submitted: false,
            }
        }, () => {
            console.log(this.state.searchResult);
        })   // 그래서 setState(콜백함수1, 콜백함수2)를 통해서 변환 값이 콜백함수 1에 들어가고 이게 완료되면 실행할 함수가 2번에 들어가게 된다.


    }
    clickList(keyword) {
        this.setState({ searchKeyword: keyword });
        this.search(keyword);
        console.log("click LI : ", keyword);
    }




render() {

    // let resetButton = null;  // 변수를 이용하여 엘리멘트 표시하는 방식 (아래 폼에 {resetButton 필요.})
    // if(this.state.searchKeyword.length > 0)
    // {
    //     resetButton = <button type="reset" className="btn-reset"></button>
    // }
    // else{
    //     resetButton = null;
    // }


    const searchForm = (
        <form onSubmit={event => this.handleSubmit(event)}>
            <input type="text" placeholder="검색어를 입력하시오." autoFocus value={this.state.searchKeyword} onChange={event => this.handleChangeInput(event)} />
            {this.state.searchKeyword.length > 0 ? <button type="reset" className="btn-reset" onClick={event => this.handleReset()}></button> : null}
        </form>
    )

    const searchResult = (this.state.searchResult.length > 0 ? (
        <ul className="result">
            {this.state.searchResult.map(item => {
                return (
                    <li key={item.id}>
                        <img src={item.imageUrl} alt={item.name} />
                        <p>{item.name}</p>
                    </li>

                )// 같은 엘리먼트 태그를 여러개 할 경우 고우의 key 값을 만들어 준다. 속도를 n^3에서 n으로 줄여준다. 보통 db key 값을 넣어준다.
            })}
        </ul>
    ) : (
        <div className="empty-box">검색 결과가 없습니다.</div>
    ))

    const keywordList = (
        <ul className="list">
            {this.state.keywordList.map((item, index) => {
                return (
                    <li key={item.id} onClick={() => this.clickList(item.keyword)}>
                        <span className="number">{index + 1}</span>
                        <span>{item.keyword}</span>
                    </li>
                )
            })}
        </ul>
    );


    const tabs = (
        <>
            <ul className="tabs">
                {Object.values(TabType).map((tabType) => {
                    return <li key={tabType} className={this.state.selectedTab === tabType ? "active" : ""} onClick={() => { this.setState({ selectedTab: tabType }) }}>{TabLabel[tabType]}</li>
                })}
            </ul>
            {this.state.selectedTab === TabType.KEYWORD ? keywordList : <>historyList</>}
        </>
    );

    return (
        <>
            <header>
                <h2 className="container">검색</h2>
            </header>
            <div className="container">
                {searchForm}
                <div className="content">
                    {this.state.submitted ? searchResult : tabs}
                </div>
            </div>
        </>
    )
}
}

ReactDOM.render(<App />, document.querySelector("#app"));


// const element = (                  // 엘리먼트 예시
//     <>
//     <header>
//         <h2 className="container">검색</h2>
//     </header>
//     <div className="container">
//     <form id="search-form-view">
//         <input type="text" placeholder="검색어를 입력하시오." autoFocus />
//         <button type="reset" className="btn-reset"></button>
//     </form>
// </div>
// </>
// );
// JSX 는 class가 className이다.
// ReactDOM.render(element, document.querySelector("#app"));