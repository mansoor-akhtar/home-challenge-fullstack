<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ApiCode;

class UserController extends Controller
{
    /**
     * get user preferences
     */
    public function getPreferences() {
        try {
            $user = auth('api')->user();
            return $this->respond([
                'data' => [
                    'category_id' => $user->preferred_category_id,
                    'source_id' => $user->preferred_source_id
                ]
            ]);
        } catch (Throwable $e) {
            return $this->respondWithError(\ApiCode::NOT_FOUND, 422, null,'Invalid token');
        }
    }


    /**
     * save user preferences
     */
    public function savePreferences(Request $request) {
        try {
            $user = auth('api')->user();
            if ($request->has('category_id') && !empty($request->category_id))
                $user->preferred_category_id = $request->category_id;

            if ($request->has('source_id') && !empty($request->source_id))
                $user->preferred_source_id = $request->source_id;
            $user->save();

            return $this->respond([], 'Record saved successfully');
        } catch (Throwable $e) {
            return $this->respondWithError(\ApiCode::NOT_FOUND, 422, null,'An Error occurred duing saving, please try later');
        }
    }
}
