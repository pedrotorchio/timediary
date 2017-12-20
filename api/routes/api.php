<?php

use Illuminate\Http\Request;
Use App\Account;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group whichß
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('accounts', 'AccountController@index');

Route::get('accounts/{account}', 'AccountController@show');

Route::post('accounts', 'AccountController@store');

Route::put('accounts/{account}', 'AccountController@update');

Route::delete('accounts/{account}', 'AccountController@delete');
