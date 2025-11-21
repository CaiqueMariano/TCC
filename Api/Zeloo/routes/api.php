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
//ver perguntas
Route::get('/verPerguntas/{id}','App\Http\Controllers\ZelooController@verPerguntas');
//perguntas
Route::post('/perguntas','App\Http\Controllers\ZelooController@perguntas');
//Ver informações do servico da mensagem infoAgendamento perguntas
Route::get('/infoAgendamento/{id}','App\Http\Controllers\ZelooController@infoAgendamento');
//ENVIAR PROPOSTA
Route::post('/enviarproposta','App\Http\Controllers\ZelooController@enviarproposta');

//Ver os servicos daquela conversa 
Route::get('/verServico/{id}','App\Http\Controllers\ZelooController@verServico');
//Pegar mensagens
Route::get('/getMensagens/{id}','App\Http\Controllers\ZelooController@getMensagens');
//CRIAR CONVERSA
Route::post('/conversar','App\Http\Controllers\ZelooController@conversar');

//Cancelar contrato:
Route::delete('/cancelarContrato/{idContrato}','App\Http\Controllers\ZelooController@cancelarContrato');
//Mandar Mensagem
Route::post('/mandarMensagem','App\Http\Controllers\ZelooController@mandarMensagem');
//Ver conversas free
Route::get('/verConversasFree/{id}','App\Http\Controllers\ZelooController@verConversasFree');

//Ver conversas idoso
Route::get('/verConversas/{id}','App\Http\Controllers\ZelooController@verConversas');
//Extrato
//Postar
Route::post('/extrato','App\Http\Controllers\ZelooController@extrato');
//Buscar
Route::get('/buscarExtrato/{idProfissional}','App\Http\Controllers\ZelooController@buscarExtrato');
//CONTAS
Route::get('/contasExtrato/{idProfissional}/{mes}','App\Http\Controllers\ZelooController@contasExtrato');
//Desfavoritar
Route::delete('/desfavoritar/{idProfissional}/{idUsuario}','App\Http\Controllers\ZelooController@desfavoritar');

//Favoritar
Route::post('/favoritar','App\Http\Controllers\ZelooController@favoritar');

//Ver favoritos
Route::get('/favoritos/{idUsuario}','App\Http\Controllers\ZelooController@favoritos');
//PAGAMENTO
Route::post('/pagar','App\Http\Controllers\ZelooController@pagar');
//finalizar
Route::post('/finalizar','App\Http\Controllers\ZelooController@finalizar');
//Ver servicos
//Aguardando aceitar buscarServicosN

Route::post('/buscarServicosN/{idUsuario}','App\Http\Controllers\ZelooController@buscarServicosN');
//LISTAR CONTRATOS 
//usuario:
Route::get('/vizualizarContratos/{idUsuario}/{status}','App\Http\Controllers\ZelooController@vizualizarContratos');
//FREE:
Route::get('/vizualizarContratosFree/{idProfissional}/{status}','App\Http\Controllers\ZelooController@vizualizarContratosFree');

//listarEndereco
Route::post('/listarEndereco','App\Http\Controllers\ZelooController@listarEndereco');
//Endereco
Route::post('/storeEnderecoUsuario','App\Http\Controllers\ZelooController@storeEnderecoUsuario');
//Aceitar os Servicos
Route::post('/aceita','App\Http\Controllers\ZelooController@aceita');

/**API DE ARMAZENAR SERVICOS */
Route::post('/storeServicos','App\Http\Controllers\ZelooController@storeServico');
/**API DE buscar SERVICOS */ 
Route::get('/buscarServicos','App\Http\Controllers\ZelooController@buscarServicos');

// API filtrar serviços 

Route::get('/filtrarServicos', 'App\Http\Controllers\ZelooController@filtrarServicos');


//Buscar profissionais
Route::get('/selectProfissional','App\Http\Controllers\ZelooController@selectProfissional');

//Select Profissional criarContrato
Route::get('/buscarProfissional/{idProfissional}','App\Http\Controllers\ZelooController@buscarProfissional');

//VIZUALIXAR CONTRATO
Route::post('/vizualizarContrato/{idProfissional}','App\Http\Controllers\ZelooController@vizualizarContrato');
//CRIAR  CONTRATO  

Route::post('/contrato','App\Http\Controllers\ZelooController@criarContrato');

//CRIAR FAMILIA
Route::post('/criarFamilia','App\Http\Controllers\ZelooController@criarFamilia');

/**Excluir o Perfil */
Route::delete('/excluirPerfil/{idUsuario}','App\Http\Controllers\ZelooController@destroyPerfil');

/**Editar Perfil */
Route::put('/updatePerfil/{idUsuario}','App\Http\Controllers\ZelooController@updatePerfil');

//Select do perfil
Route::get('/buscarDados/{idUsuario}','App\Http\Controllers\ZelooController@buscarDados');

//Buscar idoso
Route::get('/buscarIdoso/{telefoneUsuario}','App\Http\Controllers\ZelooController@buscarIdoso');


/**Login Idoso/Familiar */
Route::post('/login','App\Http\Controllers\ZelooController@loginUsuario');
/**Login Profissional */
Route::post('/loginFree','App\Http\Controllers\ZelooController@loginFree');

//Cadastro adm
Route::post('/cadastroAdm','App\Http\Controllers\ZelooController@storeAdm');

Route::get('/usuario','App\Http\Controllers\ZelooController@indexApi');

//CADASTRO USUARIO
Route::post('/usuario','App\Http\Controllers\ZelooController@storeUsuarioApi');

//BANIR USUARIO (API)
Route::post('/banir-usuario','App\Http\Controllers\ZelooController@banirUsuario');

/*
Route::post('/familiar','App\Http\Controllers\ZelooController@storeFamiliarApi');
Route::post('/idoso','App\Http\Controllers\ZelooController@storeIdosoApi');*/



//Cadastro Profissional
Route::post('/profissional','App\Http\Controllers\ZelooController@storeProfissionalApi');


//Route::post('/telefone','App\Http\Controllers\ZelooController@storeTelefoneApi');

Route::post('/telefone','App\Http\Controllers\ZelooController@storeTelefoneApi');


