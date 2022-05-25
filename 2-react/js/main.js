// 리액트는 하나의 엘레멘트 단위이기 때문에 <> </> 와 같이 전체를 한번 감싸줘야 한다. 동일 레벨의 여러개 엘리멘트가 존재하면 안된다. 리액트는 루트 노드가 있어야 한다.
// 엘리멘트보다 더 큰 개념이 컴포넌트. 컴포넌트는 UI를 나타내는 엘리먼트와 어플리케이션 로직을 포함한 상위 개념이다.

// 리액트 자채에 있는 컴포넌트를 상속
class App extends React.Component {

    constructor(){
        super();

        this.state = {
            searchKeyword: 'qweqwe',
        }
    }

    handleChangeInput(event){
        
    }

    render() {
        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    <form id="search-form-view">
                        <input type="text" placeholder="검색어를 입력하시오." autoFocus value={this.state.searchKeyword} onChange={event=>this.handleChangeInput(event)}/>
                        <button type="reset" className="btn-reset"></button>
                    </form>
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