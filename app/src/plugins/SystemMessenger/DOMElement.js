export default class DOMElement{
    constructor(selector){
        this.selector = selector;
        this.element  = document.querySelector(selector);
        this.singleClasses = {

        }
        if(!this.element)
            throw new Error('Invalid selector');
    }
    addClass(className){
        this.element.classList.add(className);
        return this;
    }
    removeClass(className){
        this.element.classList.remove(className);
        return this;
    }
    singleClass(key, value = null){
        if(value === null){
            this.removeClass(this.singleClasses[key]);
            this.singleClasses[key] = null;
        }
        else {
            this.singleClass(key);
            this.singleClasses[key] = value;
            this.addClass(value);
        }
        return this;
    }
    setText(text){
        this.element.innerHTML = text;

        return this;
    }
    setStyle(prop, value){
        this.element.style[prop] = value;

        return this;
    }
}