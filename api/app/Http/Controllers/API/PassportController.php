<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Account;
use Illuminate\Support\Facades\Auth;
use Validator;

class PassportController extends Controller
{
    public $successStatus = 200;

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('timediary')->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
        }
        else{
          // cadastrar
            return response()->json(['error'=>'Login inválido'], 401);
        }
    }
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
          'grant_type' => 'required',
          'pers_email' => 'required|email',
          'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $input = $this->mapInput2database($request->all());
        $input = $this->prepareFields($input);

        $account = Account::create($input);

        $success['api_token'] =  $account->createToken('timediary')->accessToken;
        $success['pers_display_name'] =  $account->pers_display_name;

        return response()->json(['success'=>$success], $this->successStatus);
    }
    private function mapInput2database($input){
      $output = [];

      foreach(Account::FIELDS as $field){
        if(!isset($input[$field]))
          $output[$field] = null;
      }
      foreach($input as $field => $value){
        $output[$field] = $value;
      }
      $output['email_verified'] = false;

      $output['grant_type'] = $input['grant_type'];
      $output['pers_email'] = $input['pers_email'];
      $output['password']   = $input['password'];
      
      return $output;
    }
    private function prepareFields($input){
      $display = $input['pers_email'];

      if($input['pers_display_name']){
        $display = $input['pers_display_name'];
      }
      else
        if($input['pers_first_name'] || $input['pers_last_name'])
          $display = trim(trim($input['pers_first_name'] ?: '') . ' ' . trim($input['pers_last_name'] ?: ''));

      $input['password'] = bcrypt($input['password']);
      $input['pers_display_name'] = $display;

      return $input;
    }
}
