<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuministroController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('suministros')->group(function(){
    Route::get('/', [SuministroController::class, 'index']);
    Route::post('/', [SuministroController::class, 'store']);
    Route::put('/{id}', [SuministroController::class, 'update']);
    Route::delete('/{id}', [SuministroController::class, 'destroy']);
    Route::post('/{id}/activar', [SuministroController::class, 'activar']);
});