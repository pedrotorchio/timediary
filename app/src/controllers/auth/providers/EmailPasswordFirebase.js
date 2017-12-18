import {auth} from './firebase';
import Account from '@/models/Account';

const USER_NOT_FOUND_CODE = 'auth/user-not-found';

function create(email, password){

  return new Promise((resolve, reject)=>{
    auth().createUserWithEmailAndPassword(email, password)
      .then(user=>{

        let acc = new Account(user.email);
            acc.uid           = user.uid;
            acc.emailVerified = user.emailVerified;
            acc.displayName   = user.displayName;
            acc.phone         = user.phoneNumber;
            acc.photo         = user.photoURL;
            acc.lastSignInTime = user.metadata.lastSignInTime;
            acc.creationTime  = user.metadata.creationTime;
            acc.refreshToken  = user.refreshToken;

        resolve(acc);
      })
      .catch(error=>{
        reject(firebase2Error(error));
      })
    });
}
function exists(email, password){
  return new Promise((resolve, reject)=>{
    auth().signInWithEmailAndPassword(email, password)
      .then(user=>{

        resolve(user);
      })
      .catch(error=>{

        if(error.code == USER_NOT_FOUND_CODE)
          resolve(null);

        reject(firebase2Error(error));
      });
  });
}
function firebase2Error(firebaseError){
  let error = new Error(resolveErrorMessage(firebaseError));
      error.code = firebaseError.code;

  return error;
}
function resolveErrorMessage(error){
  return error.message;
}

export default {
  create,
  exists
}
