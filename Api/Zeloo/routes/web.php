<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Authenticate;
use App\Http\Controllers\ZelooController;

// ===============================
// ROTAS DE BANIMENTO / EXCLUSÃO
// ===============================
Route::delete('/excluirPerfil/{idUsuario}', [ZelooController::class, 'destroyUsuario']);
Route::delete('/excluirPerfilFree/{idProfissional}', [ZelooController::class, 'destroyFree']);
Route::delete('/desbanir/{idUsuario}', [ZelooController::class, 'desbanirUsuario']);
Route::delete('/desbanirFree/{idProfissional}', [ZelooController::class, 'desbanirFree']);

// ===============================
// ROTAS PÚBLICAS
// ===============================
Route::get('/', [ZelooController::class, 'index']);
Route::post('/login', [ZelooController::class, 'loginAdm']);
Route::get('/logoutUser', [ZelooController::class, 'logoutUser']);

// ===============================
// ROTAS COM LOGIN
// ===============================
Route::middleware([Authenticate::class])->group(function () {

    Route::get('/dashboard', [ZelooController::class, 'dashboard']);
    Route::get('/dashboard-data', [ZelooController::class, 'DashboardData'])
        ->name('dashboard.data');

    Route::get('/responder', [ZelooController::class, 'banir']);
    Route::get('/banir', [ZelooController::class, 'banir']);
    Route::get('/registro', [ZelooController::class, 'registro']);

    // ============================
    // TELA ANALISAR DENÚNCIAS
    // ============================
    Route::get('/denuncias', [ZelooController::class, 'pesquisa'])
        ->name('denuncias');

    Route::post('/banir-usuario', [ZelooController::class, 'banirUsuario'])
        ->name('banir.usuario');

    // ============================
    // TELA ANALISAR RESPOSTAS
    // ============================
    Route::get('/denunciados', [ZelooController::class, 'buscarDenuncia'])
        ->name('denunciados')
        ->middleware(Authenticate::class);

    // Rota usada pelo formulário da sua view
    Route::get('/buscar-denuncia', [ZelooController::class, 'buscarDenuncia'])
        ->name('buscarDenuncia');
});


Route::get('/admin/download-dashboard-pdf',
    [ZelooController::class, 'downloadDashboardPdf']
)->name('download.dashboard.pdf');
