import Account from '@/models/Account';
import Error from '@/models/Error';
import google from 'google-client-api';
import {googleClient} from '@/config.js';



function exists(){

  return new Promise((resolve, reject)=>{
    google()
      .then(gapi=>{
        gapi.load('auth2', ()=>{

          const auth2 = gapi.auth2.init(googleClient);

            auth2.signIn({scope: 'profile email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.login'})
             .then(user=>{

               if(auth2.isSignedIn.get()){
                  let profile = auth2.currentUser.get().getBasicProfile()
              
                  let account = googleProfile2Account(profile);
                  resolve(account);
               }
               else
                reject(new Error('Problema resolvendo usuário'))
             })
             .catch(apiError=>{

               let error = api2Error(apiError).setLowProfile();
               reject(error);

             });
        })
      })


    //   var token = result.credential.accessToken;
    //   // detalhes do usuario
    //   var additional = result.additionalUserInfo;
    //   // The signed-in user info.
    //   var user = result.user;
    //
    //   let acc = new Account(user.email);
    //       acc.uid           = user.uid;
    //       acc.emailVerified = user.emailVerified;
    //       acc.displayName   = user.displayName;
    //       acc.phone         = user.phoneNumber;
    //       acc.photo         = user.photoURL;
    //       acc.lastSignInTime = user.metadata.lastSignInTime;
    //       acc.creationTime  = user.metadata.creationTime;
    //       acc.refreshToken  = user.refreshToken;
    //
    //       acc.isNewUser     = additional.isNewUser;
    //       additional        = additional.profile;
    //       acc.lastName      = additional.family_name;
    //       acc.gender        = additional.gender;
    //       acc.firstName     = additional.given_name;
    //       acc.personalPage  = additional.link;
    //
    //       acc.session.accessToken = token;
    //
    //       resolve(acc);
  });
}
function googleProfile2Account(profile){
  let acc = new Account(profile.getEmail());
      acc.id = profile.getId();
      acc.fullName = profile.getName();
      acc.firstName =  profile.getGivenName();
      acc.lastName  = profile.getFamilyName();
      acc.image     = profile.getImageUrl();

  return acc;
}
function api2Error(apiError){

  let error = new Error(resolveErrorMessage(apiError));

  if(apiError.code !== undefined)
      error.code = apiError.code;
  if(apiError.email !== undefined)
      error.email = apiError.email;

  return error;
}
function resolveErrorMessage(apiError){
  let message = '';

  if(apiError.message !== undefined)
    message = apiError.message;
  else if(apiError.error !== undefined)
    message = apiError.error;

  return message;
}
export default {
  exists
}
