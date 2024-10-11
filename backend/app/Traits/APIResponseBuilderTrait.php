<?php
namespace App\Traits;

use MarcinOrlowski\ResponseBuilder\ResponseBuilder;
use App\ApiCode;

trait APIResponseBuilderTrait {


    /**
     * api response with data and optional message
     * @param $data
     * @param $message
     * @return array api response
     */
    public function respond($data, $message = null) {
        return ResponseBuilder::asSuccess()->withData($data)->withMessage($message)->build();
    }


    /**
     * api response with message
     * @param $message
     * @return array api response
     */
    public function respondWithMessage($message, $code = ApiCode::STATUS_OK) {
        return ResponseBuilder::asSuccess($code)->withMessage($message)->build();
    }


    /**
     * api response with error status
     * @param $apiCode
     * @param $httpCode
     * @param $data custom data sent as error details
     * @return array api response as error
     */
    public function respondWithError($apiCode, $httpCode, $data = null, $message = null) {
        return ResponseBuilder::asError($apiCode)->withData($data)->withMessage($message)->withHttpCode($httpCode)->build();
    }


    /**
     * bad request api response
     * @param $apiCode
     * @return array api response as bad request
     */
    public function respondBadRequest($apiCode) {
        return $this->respondWithError($apiCode, 400);
    }

    /**
     * unauthenticated api response
     * @param $apiCode
     * @return array api response as bad request
     */
    public function respondUnAuthenticated($apiCode) {
        $data = ['email' => 'Invalid email or password'];
        return $this->respondWithError($apiCode, 401, $data);
    }


    /**
     * not found api response
     * @param $apiCode
     * @return array api response as not found
     */
    public function respondNotFound($apiCode) {
        return $this->respondWithError($apiCode, 404);
    }

}
