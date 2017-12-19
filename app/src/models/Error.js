export default class Error{
  constructor(message){
    this.message = message;
    this.code    = false;
    this.lowProfile = false;
  }

  toString(){
    let string = '';
    if (this.code !== false)
      string += `${this.code}::`;

    string+= this.getMessage();

    return string;
  }
  getMessage(){
    return this.message();
  }
  setLowProfile(){
    this.lowProfile = true;

    return this;
  }
}
