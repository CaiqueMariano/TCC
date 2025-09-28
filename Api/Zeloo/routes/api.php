<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


/**API DE ARMAZENAR SERVICOS */
Route::post('/storeServicos','App\Http\Controllers\ZelooController@storeServico');

Route::delete('/excluirPerfil/{idUsuario}','App\Http\Controllers\ZelooController@destroyPerfil');
Route::put('/updatePerfil/{idUsuario}','App\Http\Controllers\ZelooController@updatePerfil');
Route::get('/buscarDados/{idUsuario}','App\Http\Controllers\ZelooController@buscarDados');
Route::post('/login','App\Http\Controllers\ZelooController@loginUsuario');
Route::post('/cadastroAdm','App\Http\Controllers\ZelooController@storeAdm');
Route::get('/usuario','App\Http\Controllers\ZelooController@indexApi');
Route::post('/usuario','App\Http\Controllers\ZelooController@storeUsuarioApi');
Route::post('/familiar','App\Http\Controllers\ZelooController@storeFamiliarApi');
Route::post('/idoso','App\Http\Controllers\ZelooController@storeIdosoApi');
Route::post('/Profissional','App\Http\Controllers\ZelooController@storeProfissionalApi');
Route::post('/telefone','App\Http\Controllers\ZelooController@storeTelefoneApi');
