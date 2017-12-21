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

            auth2.signIn({scope: 'profile email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/user.addresses.read',
          ux_mode: 'popup'})
             .then(user=>{

               if(auth2.isSignedIn.get()){
                  let profile = auth2.currentUser.get().getBasicProfile()

                  let account = googleProfile2Account(profile);
                  console.log(profile);
                  gapi.client.load('plus','v1', function(){
                    gapi.client.plus.people.get({userId: 'me'}).execute(function(profile){
                      console.log(profile);
                      account = appendDetails2Account(profile);
                      resolve(account);
                    });
                  });
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
  });
}
// 'password',
// 'api_token',
// 'remember_token',
// 'email_verified',
// 'grant_type',
// 'pers_email',
// 'pers_display_name',
// 'pers_first_name',
// 'pers_last_name',
// 'pers_picture_url',
// 'pers_phone',
// 'pers_gender',
// 'pers_language',
// 'pers_occupation',
// 'loc_country',
// 'loc_state',
// 'loc_city',
// 'loc_neighbourhood',
// 'loc_complement',
// 'loc_postal_code'
function googleProfile2Account(profile){

  let acc = new Account(profile.getEmail());
      acc.id = profile.getId();
      acc.fullName = profile.getName();
      acc.firstName =  profile.getGivenName();
      acc.lastName  = profile.getFamilyName();
      acc.image     = profile.getImageUrl();

  return acc;
}
function appendDetails2Account(details,acc){
  let age = details.ageRange.min;
  let displayName = details.displayName;
  let language = details.language;
  let gender = details.gender;

  acc.age = age;
  acc.displayName = displayName;
  acc.language = language;
  acc.gender = gender;

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
