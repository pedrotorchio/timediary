import DOMElement from './DOMElement';
export default class DOMMessenger extends DOMElement{
    constructor(selector){
        super(selector);
    }

    setHumor(humorStr){
        super.singleClass('humor', humorStr);
    }
}