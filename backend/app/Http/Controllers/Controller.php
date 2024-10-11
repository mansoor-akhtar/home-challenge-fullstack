<?php

namespace App\Http\Controllers;

use App\Traits\APIResponseBuilderTrait;
use Carbon\Carbon;

abstract class Controller
{
    use APIResponseBuilderTrait;

    public function respondWithToken($tokenResult)
    {
        $now = Carbon::now();
        $tokenExpiresAt = Carbon::parse($tokenResult->token->expires_at);
        return $this->respond([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'bearer',
            'expires_in' => $now->diffInSeconds($tokenExpiresAt)
        ]);
    }
}
