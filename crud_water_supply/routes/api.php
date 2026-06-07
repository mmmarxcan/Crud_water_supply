<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuministroController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::patch('suministros/{id}/restore', [SuministroController::class, 'restore']);
Route::apiResource('suministros', SuministroController::class);
