<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    AuthController,
    NewsController,
    CategoryController,
    SourceController,
    UserController
};



Route::get('/index', [AuthController::class, 'index']);

Route::middleware(['api'])->group(function($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/sources', [SourceController::class, 'index']);
});


Route::middleware('auth:api')->group(function($router) {
    Route::get('/user-preferences', [UserController::class, 'getPreferences']);
    Route::post('/user-preferences', [UserController::class, 'savePreferences']);
});

