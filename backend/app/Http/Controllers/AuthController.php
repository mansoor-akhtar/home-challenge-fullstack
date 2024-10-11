<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateUserRequest;
use Laravel\Passport\Passport;
use App\ApiCode;

// Models
use App\Models\{
    User
};


class AuthController extends Controller
{

    /**
     * Get a JWT token via given credentials.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');
            if (\Auth::attempt($credentials)) {
                $user = $request->user();
                $tokenResult = $user->createToken('access_token');
                $token = $tokenResult->token;
                $token->save();
                return $this->respondWithToken($tokenResult);
            }
            return $this->respondUnAuthenticated(ApiCode::INVALID_CREDENTIALS);
        }  catch (Throwable $e) {
            return $this->respondUnAuthenticated(ApiCode::INVALID_CREDENTIALS);
        }
    }


    /**
     * Register new user
     */
    public function signup(CreateUserRequest $request) {
        try {
            User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            if (\Auth::attempt($request->only('email', 'password'))) {
                $user = $request->user();
                $tokenResult = $user->createToken('access_token');
                return $this->respondWithToken($tokenResult);
            } else {
                return $this->respondWithError(\ApiCode::SAVE_ERROR, 422, null,'An Error occurred duing saving, please try later'); 
            }
        } catch (Throwable $e) {
            return $this->respondWithError(\ApiCode::SAVE_ERROR, 422, null,'An Error occurred duing saving, please try later');
        }
    }
}