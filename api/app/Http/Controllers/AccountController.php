<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Account;

class AccountController extends Controller
{
  public function index()
  {
      return Account::all();
  }

  public function show(Account $account)
  {
      return $account;
  }

  public function store(Request $request)
  {
      $account = Account::create($request->all());

      return response()->json($account, 201);
  }

  public function update(Request $request, Account $account)
  {
      $account->update($request->all());

      return response()->json($account, 200);
  }

  public function delete(Account $account)
  {
      $account->delete();

      return response()->json(null, 204);
  }
}
