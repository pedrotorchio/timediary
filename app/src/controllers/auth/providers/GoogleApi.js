import Account from '@/models/Account';
import Error from '@/models/Error';
import google from 'google-client-api';
import {googleClient} from '@/config.js';

let gapi = null;
let resolve = null;
let reject  = null;

function exists(){
  return new Promise((_resolve, _reject)=>{
    resolve = _resolve;
    reject  = _reject;

    if(window.gapi !== undefined){
      gapi = window.gapi;
      handleClientLoad(handleSignInClick);
    }

  });
}

function handleClientLoad(callback) {
  // Loads the client library and the auth2 library together for efficiency.
  // Loading the auth2 library is optional here since `gapi.client.init` function will load
  // it if not already loaded. Loading it upfront can save one network request.
  gapi.load('client:auth2', ()=>initClient(callback));
}

function initClient(callback) {

  // Initialize the client with API key and People API, and initialize OAuth with an
  // OAuth 2.0 client ID and scopes (space delimited string) to request access.
  gapi.client.init({
      client_id: googleClient.id,
      scope: 'profile https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/plus.login'
  }).then(function () {
    gapi.client.load('plus', 'v1', ()=>{
      console.dir(gapi);
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

      callback();
    });
  });
}

function updateSigninStatus(isSignedIn) {
  // When signin status changes, this function is called.
  // If the signin status is changed to signedIn, we make an API call.
  if (isSignedIn) {
    makeApiCall();
  }
}

function handleSignInClick(event) {
  // Ideally the button should only show up after gapi.client.init finishes, so that this
  // handler won't be called before OAuth is initialized.
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function makeApiCall() {
  // Make an API call to the People API, and print the user's given name.

  gapi.client.plus.people.get({
    'userId' : 'me',
    'resourceName': 'people/me',
    'requestMask.includeField': 'person.names'
  }).then(function(response) {
    console.log('Hello, ' + response.result.names[0].givenName);
    resolve(response);
  }, function(reason) {
    reject(reason);
    console.log('Error: ' + reason.result.error.message);
  });
}

export default {
  exists
}
