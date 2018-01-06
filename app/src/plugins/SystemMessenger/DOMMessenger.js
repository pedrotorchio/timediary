import DOMElement from './DOMElement';
export default class DOMMessenger extends DOMElement{
    constructor(selector){
        super(selector);
    }

    setHumor(humorStr){
        super.singleClass('humor', humorStr);
    }
    setText(text){
        return new Promise(resolve=>{
            super.setText(text);
            
            let height = this.element.offsetHeight;
            resolve(height);
        });    
    }
}