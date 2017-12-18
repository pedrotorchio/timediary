export default class AuthMethod{

  submit(){
    return new Promise((resolve,reject)=>{
      this.exists()
        .then(user=>{
          if(user !== null){
            resolve(user)
          }else{
            this.register()
              .then(user=>resolve(user))
              .catch(error=>console.error(error))
          }
        })
        .catch(error=>console.error(error));
    })
  }
  exists(){
    // checa se existe e retorna promise erro ou user
    // then(user => user === null se não existe, ou Account se existe)
    return new Promise((resolve, reject)=>{
      let error = new Error('Não há método de login refinido');
          error.setLowProfile();
      reject(error);
    });
  };
  register(){
    // registra usuário no provedor
    // retorna promise
    return new Promise((resolve, reject)=>{
      let error = new Error('Não há opção de registro nesse método');
          error.setLowProfile();

      reject(error);
    });
  }
}
