<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SuministroController;
use App\Http\Controllers\Api\ClienteController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// rutas de clientes
Route::apiResource('clientes', ClienteController::class);
Route::apiResource('suministros', SuministroController::class);