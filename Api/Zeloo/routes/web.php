<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Authenticate;
use Illuminate\Auth\AuthenticationException;
use App\Http\Controllers\ZelooController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::delete('/excluirPerfil/{idUsuario}','App\Http\Controllers\ZelooController@destroyUsuario');
Route::delete('/excluirPerfilFree/{idProfissional}','App\Http\Controllers\ZelooController@destroyFree');
Route::delete('/desbanir/{idUsuario}','App\Http\Controllers\ZelooController@desbanirUsuario');
Route::delete('/desbanirFree/{idProfissional}','App\Http\Controllers\ZelooController@desbanirFree');
Route::get('/','App\Http\Controllers\ZelooController@index');
Route::get('/logoutUser','App\Http\Controllers\ZelooController@logoutUser');
Route::get('/dashboard','App\Http\Controllers\ZelooController@dashboard')->middleware(Authenticate::class);
Route::get('/responder','App\Http\Controllers\ZelooController@banir')->middleware(Authenticate::class);
Route::get('/registro','App\Http\Controllers\ZelooController@registro')->middleware(Authenticate::class);
Route::post('/login','App\Http\Controllers\ZelooController@loginAdm');
Route::get('/banir','App\Http\Controllers\ZelooController@banir')->middleware(Authenticate::class);
Route::get('/denuncias','App\Http\Controllers\ZelooController@denuncias')->name('denuncias')->middleware(Authenticate::class);
Route::get('/denunciados','App\Http\Controllers\ZelooController@denunciados')->name('denunciados')->middleware(Authenticate::class);
Route::get('/dashboard-data', [ZelooController::class, 'DashboardData'])
    ->name('dashboard.data');
    // buscar denunciados pelo nome

Route::get('/denuncias', [ZelooController::class, 'pesquisa']);

Route::get('/responder-denuncia', [ZelooController::class, 'buscarDenuncia'])->name('buscarDenuncia');


Route::get('/admin/download-dashboard-pdf', [ZelooController::class, 'downloadDashboardPdf'])
    ->name('download.dashboard.pdf');
   

