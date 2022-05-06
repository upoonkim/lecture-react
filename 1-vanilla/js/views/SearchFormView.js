import View from "./View.js";
import { on, qs } from "../helpers.js"

export default class SearchFormView extends View{
    constructor(){
        super(qs("#search-form-view"));

        this.resetElement = qs("[type=reset]", this.element);
        this.inputElement = qs("[type=text]", this.element);
        
        this.showResetButton(false)
        this.bindEvent()
    }

    showResetButton(visible = true){
        this.resetElement.style.display = visible ? "block" : "none";
    }

    bindEvent(){
        on(this.inputElement,"keyup", ()=>this.handleKeyup());    // on 함수는 어느 element에서 받을꺼냐
        on(this.element, "submit", (event)=>this.handleSubmit(event))
        on(this.resetElement,"click",()=>this.handleReset() );
    }

    handleKeyup(){
        console.log("handleKeyUp", this.inputElement.value);
        const {value} = this.inputElement;
        this.showResetButton(value.length > 0);
        
        if(value.length <= 0) this.handleReset();

    }

    handleReset(){
        console.log("click reset");
        this.emit("@reset");
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('submit');
        const {value} = this.inputElement
        this.emit("@submit",{value})
    }
}