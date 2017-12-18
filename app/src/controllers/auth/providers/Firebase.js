import {app, initializeApp, auth} from 'firebase';

export function initialize(){
  if(isInitialized())
    return;
  console.log('initializing firebase');
  initializeApp({
    apiKey: "AIzaSyA5dvYrBdXdzjv4-eDm5f4U_vQ51gx-6gg",
    authDomain: "timediary-sodev.firebaseapp.com",
    databaseURL: "https://timediary-sodev.firebaseio.com",
    projectId: "timediary-sodev",
    storageBucket: "timediary-sodev.appspot.com"
  });

}
export function isInitialized(){
  try{
    app()
  }catch(e){
    return false;
  }
  return true;
}

if(!isInitialized())
  initialize();

export {auth};
