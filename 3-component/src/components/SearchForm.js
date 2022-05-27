import React from 'react'
import ReactDOM from 'react-dom'


const SearchForm=({value, onChange, onSubmit, onReset})=>{


    const handleSubmit = (event)=>{
        event.preventDefault();
        onSubmit();
    }

    const clickReset = ()=>{
        onReset();
    }

    const handleChangeInput = (event)=>{
        onChange(event.target.value);
    }
    return (
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="검색어를 입력하시오." autoFocus value={value} onChange={handleChangeInput} />
        {value.length > 0 ? <button type="reset" className="btn-reset" onClick={clickReset}></button> : null}
    </form>       
    )
}

export default SearchForm