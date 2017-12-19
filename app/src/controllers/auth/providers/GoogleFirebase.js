import {auth} from './Firebase';
import Account from '@/models/Account';
import Error from '@/models/Error';

auth().useDeviceLanguage();
let provider = new auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });


function exists(){
  return new Promise((resolve, reject)=>{
    auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // detalhes do usuario
      var additional = result.additionalUserInfo;
      // The signed-in user info.
      var user = result.user;

      let acc = new Account(user.email);
          acc.uid           = user.uid;
          acc.emailVerified = user.emailVerified;
          acc.displayName   = user.displayName;
          acc.phone         = user.phoneNumber;
          acc.photo         = user.photoURL;
          acc.lastSignInTime = user.metadata.lastSignInTime;
          acc.creationTime  = user.metadata.creationTime;
          acc.refreshToken  = user.refreshToken;

          acc.isNewUser     = additional.isNewUser;
          additional        = additional.profile;
          acc.lastName      = additional.family_name;
          acc.gender        = additional.gender;
          acc.firstName     = additional.given_name;
          acc.personalPage  = additional.link;

          acc.session.accessToken = token;

          resolve(acc);

    }).catch((firebaseError) => {

      let error = firebase2Error(firebaseError);

        reject(error);

    });
  });
}
function firebase2Error(firebaseError){
  let error = new Error(resolveErrorMessage(firebaseError));
      error.code = firebaseError.code;
      error.email = firebaseError.email;
      // The firebase.auth.AuthCredential type that was used.
      error.credential = firebaseError.credential;

  return error;
}
function resolveErrorMessage(error){
  return error.message;
}
export default {
  exists
}
