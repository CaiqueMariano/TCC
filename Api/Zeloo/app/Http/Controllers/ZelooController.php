<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Auth\AuthenticationException;
use App\Models\servicoModel;
use App\Models\enderecoModel; 
use App\Models\enderecoUsuarioModel; 
use App\Models\User;
use App\Models\PerguntaModel;
use App\Models\AutonomiaModel;
use App\Models\HigieneModel;
use App\Models\AlimentacaoModel;
use App\Models\DiagnosticoModel;
use App\Models\MedicamentosModel;
use App\Models\CognicaoModel;
use App\Models\EmocionalModel;
use App\Models\ComportamentoModel;
use App\Models\IdosoFamiliaModel;
use App\Models\FavoritosModel;
use App\Models\UsuarioModel;
use App\Models\Denuncias;
use App\Models\DenunciasFreeModel;
use App\Models\ExtratoModel;
use App\Models\ContratoModel;
use App\Models\FamiliarModel;
use App\Models\ConversaModel;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Factory;
use App\Models\MensagensModel;
use App\Models\IdosoModel;
use App\Models\ServicoMensagemModel;
use App\Models\ProfissionalModel;
use App\Models\ProfissionalServicoModel;
use App\Models\TelefoneModel;
use App\Mail\UsuarioBanidoMail;
use App\Mail\FreeBanidoMail;
use Illuminate\Support\Facades\Mail;
/*TESTE DO GIT HAHAHAHAHAHHAHAHAHAHHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHHAHAHAHSSS*/
/*TUTORIAL LEGAL RSRS*/ 
class ZelooController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


     /*Funções do adm*/ 
    public function index()
    {
        return view('login');
    }

    public function dashboard(){
        return view('index');
    }



    /*  
    public function enviarNotificacao($token, $titulo, $mensagem)
{
    $SERVER_API_KEY = env('FIREBASE_SERVER_KEY'); // sua chave do Firebase

    $data = [
        "to" => $token,
        "notification" => [
            "title" => $titulo,
            "body" => $mensagem,
            "sound" => "default"
        ],
        "data" => [
            "extraData" => "Alguma informação adicional se quiser"
        ]
    ];

    $dataString = json_encode($data);

    $headers = [
        'Authorization: key=' . $SERVER_API_KEY,
        'Content-Type: application/json',
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}*/

// Deixando o grafico mais interativo com dados dinamicos 

public function DashboardData()
{
    // Gráfico 1: Idosos cadastrados por mês
  $idososAtivos = DB::table('tb_idoso')
    ->selectRaw('MONTH(created_at) as mes, COUNT(*) as total')
    ->groupBy('mes')
    ->orderBy('mes')
    ->pluck('total');

    // === Reclamações por mês ===
    $reclamacoesPorMes = DB::table('denuncias')
        ->selectRaw('MONTH(created_at) as mes, COUNT(*) as total')
        ->groupBy('mes')
        ->orderBy('mes')
        ->pluck('total')
        ->toArray();
    if (empty($reclamacoesPorMes)) {
        $reclamacoesPorMes = array_fill(0, 12, 0);
    }

    // === Cuidadores ativos por mês ===
    $cuidadoresAtivos = DB::table('tb_profissional')
        ->selectRaw('MONTH(created_at) as mes, COUNT(*) as total')
        ->groupBy('mes')
        ->orderBy('mes')
        ->pluck('total')
        ->toArray();
    if (empty($cuidadoresAtivos)) {
        $cuidadoresAtivos = array_fill(0, 12, 0);
    }

    // === Tipos de reclamações ===
    $tiposReclamacoes = DB::table('denuncias')
        ->select('motivoDenuncia', DB::raw('COUNT(*) as total'))
        ->groupBy('motivoDenuncia')
        ->pluck('total', 'motivoDenuncia')
        ->toArray();
    if (empty($tiposReclamacoes)) {
        $tiposReclamacoes = ['Sem Dados' => 1];
    }

    $receitaMensal = [1200, 1500, 1800, 2000, 2500, 3000];
    $rentabilidadeAnual = [5, 7, 6, 8, 9, 10, 12, 11, 13, 14, 15, 16];

    // === Verifica se não há dados para exibir ===
    $semDados = empty($reclamacoesPorMes) && empty($cuidadoresAtivos) && empty($tiposReclamacoes);

    return response()->json([
        'reclamacoesPorMes' => $reclamacoesPorMes,
        'cuidadoresAtivos' => $cuidadoresAtivos,
        'tiposReclamacoes' => $tiposReclamacoes,
        'receitaMensal' => $receitaMensal,
        'rentabilidadeAnual' => $rentabilidadeAnual,
        'semDados' => $semDados,
        'idososAtivos' => $idososAtivos,
       
    ]);
}

    public function registro()
    {
        return view('nenhum-registro');
    }


    public function login()
    {
        return view('login');
    }

    // Função para gerar PDF do Dashboard
public function downloadDashboardPdf()
{
    // Buscar dados que você deseja mostrar no PDF
    $totalReclamacoes = Denuncias::count();
    $totalCuidadores = ProfissionalModel::count();
    $totalServicos = servicoModel::count();


    $dados = compact('totalReclamacoes', 'totalCuidadores', 'totalServicos');

    $pdf = Pdf::loadView('dashboard_pdf', $dados);

    // Retornar download do PDF
    return $pdf->download('dashboard.pdf');
}
// pesquisa por nome

public function pesquisa(Request $request)
{
    $search = $request->input('search');

    $usuarios = DB::table('denuncias')
        ->join('tb_usuario', 'denuncias.idUsuario', '=', 'tb_usuario.idUsuario')
        ->select(
            'denuncias.idDenuncias as id',
            'tb_usuario.nomeUsuario as nome',
            'denuncias.motivoDenuncia as motivo',
            'denuncias.descDenuncia as desc',
            'denuncias.evidenciaDenuncia as evidencia',
            'tb_usuario.statusUsuario as status',
            DB::raw("'usuario' as origem")
        )
        ->when($search, function ($query, $search) {
            return $query->where('tb_usuario.nomeUsuario', 'LIKE', "%{$search}%");
        })
        ->paginate(10);
        
    return view('denuncias', compact('usuarios'));
}


public function buscarDenuncia(Request $request)
{
    $q = $request->input('q');

    $usuarios = \DB::table('denuncias')
        ->join('tb_usuario', 'denuncias.idUsuario', '=', 'tb_usuario.idUsuario')
        ->select(
             'denuncias.idDenuncias as id',
             'tb_usuario.nomeUsuario as nome',
             'denuncias.motivoDenuncia as motivo',
             'denuncias.descDenuncia as desc',
             'denuncias.evidenciaDenuncia as evidencia',
             'tb_usuario.statusUsuario as status'
        )
        ->when($q, function ($query, $q) {
            return $query->where('tb_usuario.nomeUsuario', 'LIKE', "%$q%");
        })
        ->paginate(10);

    return view('responder-denuncia', compact('usuarios'));
}


    

    /*LOGIN ADM*/

    public function storeAdm(Request $request){
        $user = new User();
        $user->name = $request-> name;
        $user->email = $request-> email;
        $user -> password = bcrypt($request->password);        
        $user->created_at = date('Y-m-d');
        $user->updated_at = date('Y-m-d');        
        $user ->save();
    }

    public function loginAdm(Request $request){
        if(!Auth::attempt($request->only(['email','password']))){ 
            return redirect('/'); 

        }        
        else{
            return redirect('/dashboard');        
        }
    }

    
    public function logoutUser(Request $request){
        Auth::logout();
        return redirect('/');  
    }
/* BANIR USUÁRIO */
public function destroyUsuario($idUsuario)
{
    $usuario = UsuarioModel::find($idUsuario);

    if (!$usuario) {
        return back()->with('error', 'Usuário não encontrado.');
    }

    if (Denuncias::where('idUsuario', $idUsuario)->exists()) {
        $this->aplicarBanUsuario($usuario);

        return redirect()->route('denuncias')
            ->with('success', 'Usuário banido com sucesso!');
    }

    return back()->with('error', 'Nenhuma denúncia encontrada para esse usuário.');
}

public function banirUsuario(Request $request)
{
    $validated = $request->validate([
        'idUsuario' => 'required|exists:tb_usuario,idUsuario',
        'motivoDenuncia' => 'required|string',
        'descDenuncia' => 'required|string',
        'evidenciaDenuncia' => 'nullable|string',
    ]);

    $usuario = UsuarioModel::findOrFail($validated['idUsuario']);

    Denuncias::updateOrCreate(
        ['idUsuario' => $usuario->idUsuario],
        [
            'motivoDenuncia' => $validated['motivoDenuncia'],
            'descDenuncia' => $validated['descDenuncia'],
            'evidenciaDenuncia' => $validated['evidenciaDenuncia'] ?? '-',
        ]
    );

    $this->aplicarBanUsuario($usuario);

    // Se for requisição de API, retorna JSON
    if ($request->expectsJson() || $request->is('api/*')) {
        return response()->json([
            'success' => true,
            'message' => 'Usuário banido com sucesso!',
            'data' => [
                'idUsuario' => $usuario->idUsuario,
                'nomeUsuario' => $usuario->nomeUsuario,
                'statusUsuario' => $usuario->statusUsuario
            ]
        ], 200);
    }

    return redirect()->route('denuncias')
        ->with('success', 'Usuário banido com sucesso!');
}

private function aplicarBanUsuario(UsuarioModel $usuario)
{
    if ($usuario->statusUsuario === 'inativo') {
        return;
    }

    $usuario->statusUsuario = 'inativo';
    $usuario->save();

    if (!empty($usuario->emailUsuario)) {
        Mail::to($usuario->emailUsuario)
            ->send(new UsuarioBanidoMail($usuario->nomeUsuario));
    }
}



/* BANIR PROFISSIONAL */
public function destroyFree($idProfissional)
{
    $usuario = ProfissionalModel::find($idProfissional);

    if (!$usuario) {
        return back()->with('error', 'Profissional não encontrado.');
    }

    // Verifica se existe denúncia para esse profissional
    if (DenunciasFreeModel::where('idProfissional', $idProfissional)->exists()) {

        $usuario->update(['statusProfissional' => 'inativo']);

        Mail::to($usuario->emailProfissional)
            ->send(new FreeBanidoMail($usuario->nomeProfissional));

        return redirect()->route('denunciados')
                        ->with('success', 'Profissional banido com sucesso!');
    }

    return back()->with('error', 'Nenhuma denúncia encontrada para esse profissional.');
}



/* DESBANIR USUÁRIO */
public function desbanirUsuario($idUsuario)
{
    if (Denuncias::where('idUsuario', $idUsuario)->exists()) {

        UsuarioModel::where('idUsuario', $idUsuario)
                    ->update(['statusUsuario' => 'ativo']);

        Denuncias::where('idUsuario', $idUsuario)->delete();

        return redirect()->route('denuncias')
                        ->with('success', 'Usuário desbanido com sucesso!');
    }

    return back()->with('error', 'Nenhuma denúncia encontrada para esse usuário.');
}



/* DESBANIR PROFISSIONAL */
public function desbanirFree($idProfissional)
{
    if (DenunciasFreeModel::where('idProfissional', $idProfissional)->exists()) {

        ProfissionalModel::where('idProfissional', $idProfissional)
                         ->update(['statusProfissional' => 'ativo']);

        DenunciasFreeModel::where('idProfissional', $idProfissional)->delete();

        return redirect()->route('denunciados')
                        ->with('success', 'Profissional desbanido com sucesso!');
    }

    return back()->with('error', 'Nenhuma denúncia encontrada para esse profissional.');
}


/*VER DENUCNIAS*/
    public function denuncias(){

        $usuarios = DB::table('denuncias')
        ->join('tb_usuario','denuncias.idUsuario', '=', 'tb_usuario.idUsuario')
        ->where('tb_usuario.statusUsuario', '=', 'ativo')
        ->select(
            'tb_usuario.idUsuario as id',
            'tb_usuario.nomeUsuario as nome',
            'denuncias.motivoDenuncia as motivo',
            'denuncias.descDenuncia as desc',
            'denuncias.evidenciaDenuncia as evidencia',
            DB::raw("'usuario' as origem")
        );

        $profissionais = DB::table('tb_denuncias_free')
        ->join('tb_profissional', 'tb_denuncias_free.idProfissional', '=', 'tb_profissional.idProfissional')
        ->where('tb_profissional.statusProfissional', '=', 'ativo')
        ->select(
            'tb_profissional.idProfissional as id',
            'tb_profissional.nomeProfissional as nome',
            'tb_denuncias_free.motivoDenuncia as motivo',
            'tb_denuncias_free.descDenuncia as desc',
            'tb_denuncias_free.evidenciaDenuncia as evidencia',
            DB::raw("'profissional' as origem")
        );


        $usuarios = $usuarios->unionAll($profissionais)
        ->orderByDesc('id')
        ->paginate(10);

        return view('denuncias', compact('usuarios'));
    }

    //VER DENUNCIADOS
     public function denunciados(){

        $usuarios = DB::table('denuncias')
        ->join('tb_usuario','denuncias.idUsuario', '=', 'tb_usuario.idUsuario')
        ->where('tb_usuario.statusUsuario', '=', 'inativo')
        ->select(
            'tb_usuario.idUsuario as id',
            'tb_usuario.nomeUsuario as nome',
            'denuncias.motivoDenuncia as motivo',
            'denuncias.descDenuncia as desc',
            'denuncias.evidenciaDenuncia as evidencia',
            DB::raw("'usuario' as origem")
        );

        $profissionais = DB::table('tb_denuncias_free')
        ->join('tb_profissional', 'tb_denuncias_free.idProfissional', '=', 'tb_profissional.idProfissional')
        ->where('tb_profissional.statusProfissional', '=', 'inativo')
        ->select(
            'tb_profissional.idProfissional as id',
            'tb_profissional.nomeProfissional as nome',
            'tb_denuncias_free.motivoDenuncia as motivo',
            'tb_denuncias_free.descDenuncia as desc',
            'tb_denuncias_free.evidenciaDenuncia as evidencia',
            DB::raw("'profissional' as origem")
        );


        $usuarios = $usuarios->unionAll($profissionais)
        ->orderByDesc('id')
        ->paginate(10);

        return view('responder-denuncia', compact('usuarios'));
    }


    public function banir(){
        return view('banir');
    }

    public function responder(){
        return view('responder');
    }
   // enviar sms

    /*Funcões da API*/ 
    

//COMBINAR SERVICO
   public function conversar(Request $request){

    $idUsuario = $request->idUsuario;
    $familiar = IdosoModel::where('idUsuario', $idUsuario)->first();
    $familia = IdosoFamiliaModel::where('idIdoso', $familiar->idIdoso)->first();

    $conversaE = ConversaModel::where('idProfissional', $request->idProfissional)
    ->where('idIdosoFamilia', $familia->idIdosoFamilia)
    ->first();
    

    if($conversaE){
        $conversas = $conversaE;
    }else{
        $conversas = new ConversaModel();
        $conversas ->idProfissional = $request->idProfissional;
        $conversas ->idIdosoFamilia = $familia->idIdosoFamilia;

        $conversas->save();

    }

        $servicoMensagem = new ServicoMensagemModel();

        $servicoMensagem->idConversa = $conversas->idConversa;
        $servicoMensagem->idServico = $request->idServico;

        $servicoMensagem->save();

        $conversa = DB::table('tb_conversa')
         ->join('tb_idoso_familia', 'tb_conversa.idIdosoFamilia', '=', 'tb_idoso_familia.idIdosoFamilia')
         ->join('tb_idoso', 'tb_idoso_familia.idIdoso', '=', 'tb_idoso.idIdoso')
         ->join('tb_usuario', 'tb_idoso.idUsuario', '=', 'tb_usuario.idUsuario')
         ->leftJoin('tb_mensagens', 'tb_mensagens.idMensagens', '=', DB::raw('(SELECT idMensagens FROM tb_mensagens WHERE idConversa = tb_conversa.idConversa ORDER BY idMensagens DESC LIMIT 1)'))
         ->join('tb_profissional', 'tb_conversa.idProfissional', '=', 'tb_profissional.idProfissional')
        ->where('tb_conversa.idProfissional',$request->idProfissional)
        ->where('tb_conversa.idConversa', $conversas->idConversa)
        ->select('tb_conversa.*',  'tb_usuario.*', 'tb_mensagens.idMensagens','tb_mensagens.created_at as horaConversa','tb_mensagens.remententeConversa','tb_mensagens.tipoMensagens','tb_mensagens.conteudoMensagens','tb_mensagens.arquivoMensagens')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Conversas encontrados',
            'data'=> $conversa
        ],200);

   }


   public function verServico($id){
    $servicos= DB::table('tb_servico_mensagem')
    ->join('tb_servico', 'tb_servico_mensagem.idServico', '=', 'tb_servico.idServico')
    ->join('tb_endereco', 'tb_servico.idEndereco', '=', 'tb_endereco.idEndereco')
    ->where('tb_servico_mensagem.idConversa', $id)
    ->where('tb_servico.statusServico', 'nAceito')
    ->select('tb_servico_mensagem.*', 'tb_servico.*', 'tb_endereco.*')
    ->get();

    return response()->json([
        'success' => true,
        'message' => 'Conversas encontrados',
        'data'=> $servicos
    ],200);


   }

   public function mandarMensagem(Request $request){
    try{
    $msg = new MensagensModel();
    $msg->idConversa = $request->idConversa;
    $msg->remententeConversa = $request->remententeConversa;
    $msg->tipoMensagens = $request->tipoMensagens;

    if($request->tipoMensagens === "texto"){
        $msg->conteudoMensagens = $request->conteudoMensagens;

    }else if($request->tipoMensagens === "agendamento"){
        $msg->idServico = $request->idServico;

    }else if($request->tipoMensagens === "servico"){
        $msg->idServico = $request->idServico;

    }else if ($request->tipoMensagens !== "texto" && $request->hasFile('arquivoMensagens')) {
        $path = $request->file('arquivoMensagens')->store('mensagens', 'public');
        $msg->arquivoMensagens = $path;
        
    }

    $msg->save();

    return response()->json($msg);
   }catch (\Exception $e) {
    return response()->json([
        'error' => 'Erro ao buscar mensagens',
        'details' => $e->getMessage()
    ], 500);
}
   }

   public function infoAgendamento($id){
        $servico = DB::table('tb_mensagens')
        ->join('tb_servico', 'tb_mensagens.idServico', '=', 'tb_servico.idServico')
        ->where('tb_servico.idServico', $id)
        ->select('tb_servico.*', 'tb_mensagens.*')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Conversas encontrados',
            'data'=> $servico
        ],200);
   }




   public function verConversasFree($id){
    $conversa = DB::table('tb_conversa')
         ->join('tb_idoso_familia', 'tb_conversa.idIdosoFamilia', '=', 'tb_idoso_familia.idIdosoFamilia')
         ->join('tb_idoso', 'tb_idoso_familia.idIdoso', '=', 'tb_idoso.idIdoso')
         ->join('tb_usuario', 'tb_idoso.idUsuario', '=', 'tb_usuario.idUsuario')
         ->leftJoin('tb_mensagens', 'tb_mensagens.idMensagens', '=', DB::raw('(SELECT idMensagens FROM tb_mensagens WHERE idConversa = tb_conversa.idConversa ORDER BY idMensagens DESC LIMIT 1)'))
         ->join('tb_profissional', 'tb_conversa.idProfissional', '=', 'tb_profissional.idProfissional')
        ->where('tb_conversa.idProfissional',$id)
        ->select('tb_conversa.*',  'tb_usuario.*', 'tb_mensagens.idMensagens','tb_mensagens.created_at as horaConversa','tb_mensagens.remententeConversa','tb_mensagens.tipoMensagens','tb_mensagens.conteudoMensagens','tb_mensagens.arquivoMensagens')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Conversas encontrados',
            'data'=> $conversa
        ],200);
   }

   public function enviarproposta(Request $request){
    try{
     $proposta = new ProfissionalServicoModel();

     $proposta->idProfissional = $request->idProfissional;
     $proposta->idServico = $request->idServico;
     $proposta->precoPersonalizado = $request->precoPersonalizado;
     
     $proposta->save();

     $msg = new MensagensModel();
     $msg->idConversa = $request->idConversa;
     $msg->remententeConversa = $request->remententeConversa;
     $msg->tipoMensagens = "proposta";
     $msg->idProfissionalServico = $proposta->idProfissionalServico;
    $msg->idServico= $proposta->idServico;
     $msg->save();

     return response()->json([
        'success' => true,
        'message' => 'feito',
        'proposta' => $proposta,
        'msg' => $msg
    ],200);
   }catch (\Exception $e) {
   
    return response()->json([
        'error' => 'Erro ao buscar mensagens',
        'details' => $e->getMessage()
    ], 500);

}

   }
   public function verConversas($id){
    $conversa = DB::table('tb_conversa')
         ->join('tb_idoso_familia', 'tb_conversa.idIdosoFamilia', '=', 'tb_idoso_familia.idIdosoFamilia')
         ->join('tb_idoso', 'tb_idoso_familia.idIdoso', '=', 'tb_idoso.idIdoso')
         ->join('tb_usuario', 'tb_idoso.idUsuario', '=', 'tb_usuario.idUsuario')
         ->leftJoin('tb_mensagens', 'tb_mensagens.idMensagens', '=', DB::raw('(SELECT idMensagens FROM tb_mensagens WHERE idConversa = tb_conversa.idConversa ORDER BY idMensagens DESC LIMIT 1)'))
         ->join('tb_profissional', 'tb_conversa.idProfissional', '=', 'tb_profissional.idProfissional')
        ->where('tb_usuario.idUsuario',$id)
        ->select('tb_conversa.*',  'tb_profissional.*', 'tb_mensagens.idMensagens', 'tb_mensagens.created_at as horaConversa','tb_mensagens.remententeConversa','tb_mensagens.tipoMensagens','tb_mensagens.conteudoMensagens','tb_mensagens.arquivoMensagens')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Conversas encontrados',
            'data'=> $conversa
        ],200);
   }
   public function getMensagens($id)
   {
       try {
           $conversa = ConversaModel::find($id);

           /* $mensagens = MensagensModel::where('idConversa', $id) 
           ->orderBy('created_at', 'asc') 
           ->get();*/
   
           $mensagens = MensagensModel::where('idConversa', $id)
               ->leftJoin('tb_servico', 'tb_mensagens.idServico', '=', 'tb_servico.idServico')
               ->leftJoin('tb_profissional_servico', 'tb_servico.idServico', '=', 'tb_profissional_servico.idServico')
               ->leftJoin('tb_endereco', 'tb_servico.idEndereco', '=', 'tb_endereco.idEndereco')
               ->orderBy('idMensagens', 'asc')
               ->select(
                'tb_servico.idServico',
                'tb_servico.nomeServico',
                'tb_servico.idIdosoFamilia',
                'tb_servico.tipoServico',
                'tb_servico.descServico',
                'tb_servico.generoServico',
                'tb_servico.dataServico',
                'tb_servico.horaInicioServico',
                'tb_servico.horaTerminoServico',
                'tb_servico.idEndereco',
                'tb_servico.statusServico',
                'tb_servico.created_at',
                'tb_servico.updated_at',
                'tb_profissional_servico.idProfissionalServico',
                'tb_profissional_servico.precoPersonalizado',
                'tb_profissional_servico.idServico as IDDOSERVICO',
                'tb_mensagens.*',
                'tb_endereco.*'
            )
               ->get();
   
           return response()->json([
               'idConversa' => $id,
               'mensagens' => $mensagens
           ], 200);
   
       } catch (\Exception $e) {
   
           return response()->json([
               'error' => 'Erro ao buscar mensagens',
               'details' => $e->getMessage()
           ], 500);
   
       }
   }



    public function extrato(Request $request){
        $extrato = new ExtratoModel();
        $extrato -> idProfissional = $request->idProfissional;
        $extrato -> idContrato = $request->idContrato;
        $extrato -> valor = $request->valor;
        $extrato -> dataExtrato = $request->dataExtrato;
        $extrato -> horarioExtrato = $request->horarioExtrato;

        $extrato->save();
  
        return response()->json([
            'success' => true,
            'data' => $extrato,
            'message'=> 'criou-se com sucesso! eba!',
            'code' =>200
        ]);
    }

     //Buscar Servicos n aceitos
     public function buscarExtrato($idProfissional){  
        
        $extrato = DB::table('tb_extrato')
        ->join('tb_contrato', 'tb_extrato.idContrato', '=', 'tb_contrato.idContrato')
        ->join('tb_profissional_servico', 'tb_contrato.idProfissionalServico', '=', 'tb_profissional_servico.idProfissionalServico')
        ->join('tb_servico', 'tb_profissional_servico.idServico', '=', 'tb_servico.idServico')
        ->where('tb_extrato.idProfissional',$idProfissional)
        ->select('tb_extrato.*', 'tb_contrato.*', 'tb_servico.*')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Contratos encontrados',
            'data'=> $extrato
        ],200);
    }

    public function contasExtrato($idProfissional, $mes)
{
    $total = ExtratoModel::where('idProfissional', $idProfissional)
        ->whereMonth('dataExtrato', $mes)
        ->sum('valor');

    return response()->json([
        'mes' => $mes,
        'data' => $total
    ]);
}

    //CRIAR ENDERECO!
    public function storeEnderecoUsuario(Request $request){
        try{
            $endereco = new enderecoModel();

            $endereco -> ruaUsuario = $request->ruaUsuario;
            $endereco -> numLogradouroUsuario = $request ->numLogradouroUsuario;
            $endereco -> estadoUsuario = $request->estadoUsuario;
            $endereco -> bairroUsuario = $request->bairroUsuario;
            $endereco -> nomeEndereco = $request->nomeEndereco;
            $endereco ->cepUsuario = $request->cepUsuario;
            $endereco ->cidadeUsuario = $request->cidadeUsuario;

            $endereco->save();


            //TABELA DO ENDERECO DO USUARIO!

            $idUsuario = $request->idUsuario;
            $familiar = IdosoModel::where('idUsuario', $idUsuario)->first();
            $familia = IdosoFamiliaModel::where('idIdoso', $familiar->idIdoso)->first();

            $enderecoU = new enderecoUsuarioModel();

            $enderecoU -> idIdosoFamilia = $familia->idIdosoFamilia;
            $enderecoU -> idEndereco = $endereco->idEndereco;

            $enderecoU->save();

            return response()->json([
                'success' => true,
                'message'=> 'criou-se com sucesso! eba!',
                'code' =>200
            ]);



        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar endereco',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    //LISTAR ENEDERECO!

    public function listarEndereco(Request $request){
        $idUsuario = $request->idUsuario;       
        $familiar = IdosoModel::where('idUsuario', $idUsuario)->first();
        $familia = IdosoFamiliaModel::where('idIdoso', $familiar->idIdoso)->first();
        $enderecos = enderecoUsuarioModel::where('idIdosoFamilia', $familia->idIdosoFamilia)->get();
        $idsEnderecos = $enderecos->pluck('idEndereco'); 
        $enderecosDetalhes = enderecoModel::whereIn('idEndereco', $idsEnderecos)->get();


        if(!$enderecosDetalhes){
            return response()->json([
                'success' => false,
                'message' => 'erro'
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'sucesso ao buscar serviços' ,
            'data' => $enderecosDetalhes
        ], 200);

    }


      /*CRIACÃO DE SERVICO FAMILIARRRRRRRR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      public function storeServicoFamiliar(Request $request){
        try{
          

            $idUsuario = $request->idUsuario;
           $familiar = IdosoModel::where('idUsuario', $idUsuario)->first();
            $familia = IdosoFamiliaModel::where('idFamiliar', $familiar->idFamiliar)->first();


            $servico = new servicoModel();
            $servico -> nomeServico =$request ->nomeServico;
            $servico->idIdosoFamilia = $familia->idIdosoFamilia;
            $servico -> tipoServico = $request -> tipoServico;
            $servico -> descServico = $request -> descServico;
            $servico -> dataServico = $request -> dataServico;
            $servico -> horaInicioServico = $request -> horaInicioServico;
            $servico -> horaTerminoServico = $request -> horaTerminoServico;
            $servico -> idEnderecoUsuario = $request -> idEnderecoUsuario;
           
            

            $servico->save();

            return response()->json([
                'message'=> 'criou-se com sucesso! eba!',
                'code' =>200
            ]);


        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar servico',
                'error' => $e->getMessage()
            ], 500);
        }
      }*/

      // CRIAÇÃO DO PAGAMENTO
        public function storePagamento(Request $request){
            try{
                $pagamento = new servicomodel();

                $pagamento -> idContrato = $request ->idContrato;
                $pagamento -> tipoPagamento = $request -> tipoPagamento;
                $pagamento -> valorPagamento = $request -> valorPagamento;
                $pagamento -> dataPagamento = $request -> dataPagamento;
                $pagamento -> statusPagamento = $request -> statusPagamento;

            
            $pagamento->save();

             return response()->json([
                'message'=> 'criou-se com sucesso! eba!',
                'code' =>200
            ]);    
            }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar realizar pagamento',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    
/*
       // duas opçoes de api de tipo de pagamento

     public function storetipoPagamento(Request $request){
        try{
              $tipopagamento = new servicomodel();
              
              $tipopagamento -> tipopagamento = $request ->tipopagamento;
          $tipopagamento->save();

            return response()->json([
                'message'=> 'criou-se com sucesso! eba!',
                'code' =>200
        ]);
    
     }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao selecionar tipo de pagamento',
                'error' => $e->getMessage()
            ], 500);
        }
    }
        */

   // CRIAÇÃO  tipo de Pagamento 
      public function tiposPagamento(){
        $tipoPagamento = ['Cartão de Crédito', 'Cartão débito','Boleto Bancário','Pix','Dinheiro'];
        return response()-> json([
            'sucess' => true,
            'data' => $tipoPagamento,
            'code' => 200
        ]);      }

      /*CRIACÃO DE SERVICO*/
      public function storeServico(Request $request){
        try{
          

            $idUsuario = $request->idUsuario;
            $idoso = IdosoModel::where('idUsuario', $idUsuario)->first();
            $familia = IdosoFamiliaModel::where('idIdoso', $idoso->idIdoso)->first();


            $servico = new servicoModel();
            $servico -> nomeServico =$request ->nomeServico;
            $servico->idIdosoFamilia = $familia->idIdosoFamilia;
            $servico -> tipoServico = $request -> tipoServico;
            $servico -> descServico = $request -> descServico;
            $servico -> dataServico = $request -> dataServico;
            $servico -> generoServico = $request-> generoServico;
            $servico -> horaInicioServico = $request -> horaInicioServico;
            $servico -> horaTerminoServico = $request -> horaTerminoServico;
            $servico -> idEndereco= $request -> idEndereco;
            $servico -> statusServico = "nAceito";

            $servico->save();

            return response()->json([
                'success' => true,
                'message'=> 'criou-se com sucesso! eba!',
                'code' =>200
            ]);


        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar servico',
                'error' => $e->getMessage()
            ], 500);
        }
      }


      //PERGUNTAS DO CAO

      public function perguntas(Request $request){

        try{
        $perguntas = new PerguntaModel();
        $perguntas->idUsuario = $request->idUsuario;

        $perguntas->save();



        foreach($request->autonomia as $autonomiaT){
            AutonomiaModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'nivelAutonomia' => $autonomiaT
            ]);
        }

        foreach($request->higiene as $higieneT){
            HigieneModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'nivelHigiene' => $higieneT
            ]);
        }


        foreach($request->medicamentos as $medicamentosT){
            MedicamentosModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'tipoMedicamento' => $medicamentosT
            ]);
        }

        foreach($request->cognicao as $cognicaoT){
            CognicaoModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'nivelCognicao' => $cognicaoT
            ]);
        }

        foreach($request->emocional as $emocionalT){
            EmocionalModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'nivelEmocional' => $emocionalT
            ]);
        }
        foreach($request->alimentacao as $alimentacaoT){
            AlimentacaoModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'tipoAlimentacao' => $alimentacaoT,
                'descAlimentacao' => $request->dietaTexto,
            ]);
        }

        foreach($request->doencas as $doencasT){
            DiagnosticoModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'doencaDiagnostico' => $doencasT,
            ]);
        }

        foreach($request->alergias as $alergiasT){
            DiagnosticoModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'alergiaDiagnostico' => $alergiasT,
            ]);
        }


        foreach($request->comportamento as $comportamentoT){
            ComportamentoModel::create([
                'idPergunta' => $perguntas->idPergunta,
                'tipoComportamento' => $comportamentoT,
            ]);
        }

        

        
        return response()->json([
            
            'message' => 'funcionoi aidna bem n aguenotm mais'
    
    
    ]);

        
        
       
      }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erro ao listar usuários',
            'error' => $e->getMessage()
        ], 500);
    }
    
    }


    public function verPerguntas($id){


        $perguntasE = PerguntaModel::where('idUsuario', $id)
        ->first();

        if($perguntasE){


            $alimentacao = DB::table('tb_alimentacao')
            ->where('tb_alimentacao.idPergunta', $perguntasE->idPergunta)
            ->select('tb_alimentacao.*')
            ->get();

           
            $diagnostico = DB::table('tb_diagnostico')
            ->where('tb_diagnostico.idPergunta', $perguntasE->idPergunta)
            ->select('tb_diagnostico.*')
            ->get();
 

            $autonomia = DB::table('tb_autonomia')
            ->where('tb_autonomia.idPergunta', $perguntasE->idPergunta)
            ->select('tb_autonomia.*')
            ->get();

            $cognicao = DB::table('tb_cognicao')
            ->where('tb_cognicao.idPergunta', $perguntasE->idPergunta)
            ->select('tb_cognicao.*')
            ->get();

            $comportamento = DB::table('tb_comportamento')
            ->where('tb_comportamento.idPergunta', $perguntasE->idPergunta)
            ->select('tb_comportamento.*')
            ->get();


            $emocional = DB::table('tb_emocional')
            ->where('tb_emocional.idPergunta', $perguntasE->idPergunta)
            ->select('tb_emocional.*')
            ->get();

            $higiene = DB::table('tb_higiene')
            ->where('tb_higiene.idPergunta', $perguntasE->idPergunta)
            ->select('tb_higiene.*')
            ->get();

            $medicamentos = DB::table('tb_medicamentos')
            ->where('tb_medicamentos.idPergunta', $perguntasE->idPergunta)
            ->select('tb_medicamentos.*')
            ->get();


            return response()->json([
                'existe' => true,
                'data' => $perguntasE,
                'alimentacao' => $alimentacao,
                'diagnostico' => $diagnostico,
                'autonomia' => $autonomia,
                'cognicao' => $cognicao,
                'comportamento' => $comportamento,
                'emocional' => $emocional,
                'higiene' => $higiene,
                'medicamentos' => $medicamentos,
                'message' => 'existe'
            ], 200);

        }else{
            return response()->json([
                'existe' => false,
                'message' => 'Não existe'
            ], 400);
        }
    }

      //CRIA FAMILAI
      public function criarFamilia(Request $request){
        

        $idUsuarioFamiliar = $request->idUsuarioFamiliar;
        $familiar = FamiliarModel::where('idUsuario', $idUsuarioFamiliar)->first();

        $idUsuarioIdoso = $request->idUsuarioIdoso;
        $idoso = IdosoModel::where('idUsuario', $idUsuarioIdoso)->first();

        $atualizado = IdosoFamiliaModel::where('idIdoso', $idoso->idIdoso)
        ->update([
            'idFamiliar' => $familiar->idFamiliar
        ]);

    if ($atualizado) {
        return response()->json([
            'success' => true,
            'message' => 'Idoso vinculado com sucesso ao familiar!'
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Não foi possível atualizar o vínculo.'
        ], 400);
    }
       
    }


    //DENUNCIAR IDOSO
    public function denunciarIdoso(Request $request){

        $denunciar = new Denuncias();
        
        $denunciar->idUsuario= $request->idUsuario;
        $denunciar->motivoDenuncia= $request->motivoDenuncia;
        $denunciar->descDenuncia= $request->descDenuncia;
        $denunciar->evidenciaDenuncia= $request->evidenciaDenuncia;
        
        $denunciar ->save();

        return response()->json([
            'message'=> 'Denunciado',
            'success' => true,
            'code'=>200]
        );
        
        
        }


        //DENUNCIAR CUIDADOR
        public function denunciarFree(Request $request){

            $denunciar = new DenunciasFreeModel();
            
            $denunciar->idProfissional= $request->idProfissional;
            $denunciar->motivoDenuncia= $request->motivoDenuncia;
            $denunciar->descDenuncia= $request->descDenuncia;
            $denunciar->evidenciaDenuncia= $request->evidenciaDenuncia;
            
            $denunciar ->save();

            return response()->json([
                'message'=> 'Denunciado',
                'success' => true,
                'code'=>200]
            );
            
            
            }

    public function updatePerfil(Request $request, $idUsuario){
        UsuarioModel::where('idUsuario', $idUsuario)->update([
            'nomeUsuario' => $request->nomeUsuario,
            'telefoneUsuario' => $request-> telefoneUsuario,
            'emailUsuario' => $request-> emailUsuario,

        ]);

        return response()->json([
            'message'=> 'Dados alterados com sucesso',
            'success' => true,
            'code'=>200]
        );


    }


    //Alterar servico
    public function updateServico(Request $request, $idServico){
        servicoModel::where('idServico', $idServico)->update([
            'nomeServico' => $request->nomeServico,
            'descServico' => $request->descServico,
            'tipoServico' => $request-> nomeServico,
            'dataServico' => $request-> dataServico,
            'horaInicioServico' => $request-> horaInicioServico,
            'horaTerminoServico' => $request-> horaTerminoServico

        ]);

        return response()->json([
            'message'=> 'Dados alterados com sucesso',
            'success' => true,
            'code'=>200]
        );


    }

    public function destroyPerfil($idUsuario)
    {
        UsuarioModel::where('idUsuario','=',$idUsuario)->delete();

        return response()->json([
            'success' => true,
            'message'=> 'Dados excluídos com sucesso',
            'code'=>200]
        );
    }


    //Buscar proffiosnais

    public function selectProfissional(){
        $profissional = ProfissionalModel::all();

        if(!$profissional){
            return response()->json([
                'success' => false,
                'message' => 'erro'
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'sucesso ao buscar profissionais' ,
            'data' => $profissional
        ], 200);
    }
        
    public function buscarServicos(){
        $servicos = DB::table('tb_servico')
        ->join('tb_endereco', 'tb_servico.idEndereco','=','tb_endereco.idEndereco')
        ->join('tb_idoso_familia', 'tb_servico.idIdosoFamilia', '=', 'tb_idoso_familia.idIdosoFamilia')
        ->join('tb_idoso', 'tb_idoso_familia.idIdoso', '=', 'tb_idoso.idIdoso')
        ->join('tb_usuario', 'tb_idoso.idUsuario', '=', 'tb_usuario.idUsuario')
        ->where('tb_servico.statusServico', "nAceito")
        ->select('tb_servico.*','tb_usuario.*', 'tb_endereco.*')
        ->get();

        

        return response()->json([
            'success'=> true,
            'message'=> 'sucesso ao buscar serviços' ,
            'data' => $servicos
        ], 200);
    }


    //Buscar Servicos n aceitos
    public function buscarServicosN($idUsuario){  
        $idoso = IdosoModel::where('idUsuario', $idUsuario)->first();
        $familia = IdosoFamiliaModel::where('idIdoso', $idoso->idIdoso)->first();

        $servicos = DB::table('tb_servico')
        ->where('tb_servico.idIdosoFamilia',$familia->idIdosoFamilia)
        ->where('tb_servico.statusServico', 'nAceito')
        ->select('tb_servico.*')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Contratos encontrados',
            'data'=> $servicos
        ],200);
    }


//Favoritar
public function favoritar(Request $request){
    $idUsuario = $request->idUsuario;
    $idoso = IdosoModel::where('idUsuario', $idUsuario)->first();
    $familia = IdosoFamiliaModel::where('idIdoso', $idoso->idIdoso)->first();

    $favoritar = new FavoritosModel();

    $favoritar->idProfissional = $request-> idProfissional;
    $favoritar->idIdosoFamilia = $familia->idIdosoFamilia;

    $favoritar ->save();

    return response()->json([
        'success' => true,
        'message' => 'Favoritado!',
        
    ],200);

}


//Desfavoritar
    
public function desfavoritar($idProfissional, $idUsuario){
    $idoso = IdosoModel::where('idUsuario', $idUsuario)->first();
    $familia = IdosoFamiliaModel::where('idIdoso', $idoso->idIdoso)->first();

    FavoritosModel::where('idIdosoFamilia','=',$familia->idIdosoFamilia)
    ->where('idProfissional', '=', $idProfissional)
    ->delete();

    return response()->json([
        'success' => true,
        'message'=> 'Desfavoritado!',
        'code'=>200]
    );
}
//Ver Favoritos
public function favoritos($idUsuario){
    $idoso = IdosoModel::where('idUsuario', $idUsuario)->first();
    $familia = IdosoFamiliaModel::where('idIdoso', $idoso->idIdoso)->first();

    $favoritos = DB::table('tb_favoritos')
    ->join('tb_profissional', 'tb_favoritos.idProfissional', '=', 'tb_profissional.idProfissional')
    ->where('tb_favoritos.idIdosoFamilia', $familia->idIdosoFamilia)
    ->select('tb_favoritos.*', 'tb_profissional.*')
    ->get();
    
    return response()->json([
        'success' => true,
        'message' => 'Favoritos encontrados',
        'data'=> $favoritos
    ],200);
}


//em ativo
public function vizualizarContratos($idUsuario, $status){

    $idoso = IdosoModel::where('idUsuario', $idUsuario)->first();
    $familia = IdosoFamiliaModel::where('idIdoso', $idoso->idIdoso)->first();
    $contratos = DB::table('tb_contrato')
    ->join('tb_profissional_servico', 'tb_contrato.idProfissionalServico', '=', 'tb_profissional_servico.idProfissionalServico')
    ->join('tb_servico', 'tb_profissional_servico.idServico', '=' ,'tb_servico.idServico')
    ->join('tb_profissional', 'tb_profissional_servico.idProfissional', '=', 'tb_profissional.idProfissional')
    ->where('tb_servico.idIdosoFamilia', $familia->idIdosoFamilia)
    ->where('tb_contrato.statusContrato', $status)
    ->select('tb_contrato.*', 'tb_servico.*', 'tb_profissional.*', 'tb_profissional_servico.*')
    ->get();


    return response()->json([
        'success' => true,
        'message' => 'Contratos ativos encontrados',
        'data'=> $contratos
    ],200);
}


//LISTAR CONTRATOS
    public function vizualizarContrato($idProfissional){
        $contratos = DB::table('tb_contrato')
        ->join('tb_profissional_servico', 'tb_contrato.idProfissionalServico', '=', 'tb_profissional_servico.idProfissionalServico')
        ->where('tb_profissional_servico.idProfissional', $idProfissional)
        ->select('tb_contrato.*')
        ->get();


        return response()->json([
            'success' => true,
            'message' => 'Contratos encontrados',
            'data'=> $contratos
        ],200);
    }

//CONTRATOS MAS COM PROFISSIONAL
//ATIVO

public function cancelarContrato($idContrato){

    $cancelar = ContratoModel::find($idContrato);


    ContratoModel::where('idContrato', '=', $idContrato)->update(['statusContrato' => 'cancelado']);

    return response()->json([
        'success' => true,
        'message' => 'Contrato cancelado com sucesso'
    ], 200);
}
        
   


//Cancelado
public function vizualizarContratosFree($idProfissional, $status){

    try{
    $contratos = DB::table('tb_contrato')
    ->join('tb_profissional_servico', 'tb_contrato.idProfissionalServico', '=', 'tb_profissional_servico.idProfissionalServico')
    ->join('tb_servico', 'tb_profissional_servico.idServico', '=' ,'tb_servico.idServico')
    ->join('tb_idoso_familia', 'tb_servico.idIdosoFamilia', '=', 'tb_idoso_familia.idIdosoFamilia')
    ->join('tb_idoso',  'tb_idoso_familia.idIdoso','=', 'tb_idoso.idIdoso')
    ->join('tb_usuario','tb_idoso.idUsuario','=','tb_usuario.idUsuario')
    ->join('tb_profissional', 'tb_profissional_servico.idProfissional', '=', 'tb_profissional.idProfissional')
    ->where('tb_profissional_servico.idProfissional', $idProfissional)
    ->where('tb_contrato.statusContrato', $status)
    ->select('tb_contrato.*', 'tb_servico.*', 'tb_usuario.*', 'tb_profissional_servico.*'/*, 'tb_conversa.*'/*/)
    ->get();


    return response()->json([
        'success' => true,
        'message' => 'Contratos sem pagar encontrados',
        'data'=> $contratos
    ],200);
}catch (\Exception $e) {
    return response()->json([
        'success' => false,
        'message' => 'Erro ao listar usuários',
        'error' => $e->getMessage()
    ], 500);
}
}

//

    //PAGAMENTO

    public function pagar(Request $request){
        $contrato = ContratoModel::find($request->idContrato);
           if($contrato){
            $contrato -> statusContrato = "finalizado";
            $contrato-> save();
           }

           return response()->json([
            'success' => true,
            'message' => 'Contrato Pago!',
            'data'=> $contrato
        ],200);
        
       
    }
//FINALIZAR CONTRATO
    public function finalizar(Request $request){
        $contrato = ContratoModel::find($request->idContrato);
           if($contrato){
            $contrato -> statusContrato = "Aguardando Pagamento";
            $contrato-> save();
           }

           return response()->json([
            'success' => true,
            'message' => 'Contrato finalizado!',
            'data'=> $contrato
        ],200);
        
       
    }
    //Buscar dados Profssional

    public function buscarProfissional($idProfissional){
        $profissional = ProfissionalModel::find($idProfissional);
        if(!$profissional){
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $profissional
        ], 200);
    }

    //Buscar dados dados usuario

    public function buscarIdoso($telefoneUsuario){

        $usuario = UsuarioModel::firstWhere('telefoneUsuario', $telefoneUsuario);

        if(!$usuario){
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $usuario
        ], 200);
        
    }

    public function buscarDados($idUsuario){

        $usuario =  UsuarioModel::find($idUsuario);

        if(!$usuario){
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $usuario
        ], 200);
        
    }

    /**Login Idoso/Familiar */

    public function loginUsuario(Request $request)
    {
        $usuario = UsuarioModel::where('telefoneUsuario', $request->telefoneUsuario)->first();

    if (!$usuario || !Hash::check($request->senhaUsuario, $usuario->senhaUsuario) || $usuario->statusUsuario === 'inativo') {
        return response()->json([
            'success' => false,
            'message' => 'Telefone ou senha incorretos'
        ], 401);
    }


    return response()->json([
        'success' => true,
        'message' => 'Login realizado com sucesso',
        'data' => $usuario
    ]);
    }




        /**Login FreeLancer */

        public function loginFree(Request $request)
        {
            $usuario = ProfissionalModel::where('emailProfissional', $request->emailProfissional)->first();
    
        if (!$usuario || !Hash::check($request->senhaProfissional, $usuario->senhaProfissional) || $usuario->statusProfissional === 'inativo') {
            return response()->json([
                'success' => false,
                'message' => 'E-mail ou senha incorretos'
            ], 401);
        }

        
        
    return response()->json([
        'success' => true,
        'message' => 'Login realizado com sucesso',
        'data' => $usuario
    ]);
    }

    

     public function indexApi()
    {
        try {
            $usuarios = UsuarioModel::all();
            
            return response()->json([
                'success' => true,
                'message' => 'Usuários listados com sucesso',
                'data' => $usuarios
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao listar usuários',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }


    //CRIANDO O USUARIO
    public function storeUsuarioApi(Request $request)
{
    try {
        $usuario = new UsuarioModel();

        $usuario->nomeUsuario = $request->nomeUsuario;
        $usuario->telefoneUsuario = $request->telefoneUsuario;
        $usuario->emailUsuario = $request->emailUsuario ?? null;
        $usuario->senhaUsuario = bcrypt($request->senhaUsuario);
        $usuario->dataNasc = $request->dataNasc;
        $tipoUsuario = $request->input('tipoUsuario', 'idoso');
        $usuario->tipoUsuario = $tipoUsuario;
        $usuario->statusUsuario = 'ativo';

        // Foto é opcional - só processa se for fornecida
        $image = $request->file('fotoUsuario');
        if($image != null){
            $path = $image->store('imagesPicture', 'public');
            // Usa fill para evitar erro se coluna não existir
            $usuario->fill(['fotoUsuario' => $path]);
        }

        $usuario->save();

//SE FOR IDOSO VAI PRA TABELA IDOSO
        if($tipoUsuario === 'idoso')
        {
        $idoso = new IdosoModel();
        $idoso->idUsuario = $usuario->idUsuario;

        $idoso->save();

        //O IDOSO VAI PRA TAEBLA FAMILIA
        $idosoFamilia = new IdosoFamiliaModel();

        $idosoFamilia->idIdoso = $idoso->idIdoso;

        $idosoFamilia->save();
        } elseif ($tipoUsuario === 'familiar') {

            //SE FOR FAMILIAR ELE VAI PRA TABELA FAMILIAR
            $familiar = new FamiliarModel();
            $familiar-> idUsuario = $usuario->idUsuario;

            $familiar -> save();
        }


        return response()->json([
            'success' => true,
            'message' => 'Usuário criado com sucesso',
            'data' => $usuario
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erro ao criar usuário',
            'error' => $e->getMessage()
        ], 500);
    }
}


/*
public function criarContrato(Request $request)
{
    try {
        $contrato = new ContratoModel();

        $contrato->idProfissionalServico = $request->idProfissionalServico;
        $contrato->dataInicioContrato = date('Y-m-d'); 
        $contrato->statusContrato = 'inativo';
        $contrato->obsContrato = '-';


        $contrato->save();

        return response()->json([
            'success' => true,
            'message' => 'Contrato criado com sucesso',
            'data' => $contrato
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erro ao criar Contrato',
            'error' => $e->getMessage()
        ], 500);
    }
}*/

//CRIAR FAMILIASSS


  public function storeFamiliarApi(Request $request)
    {
        try {
         
            $familiar = new FamiliarModel();

            $familiar->idUsuario = $request->idUsuario;
            $familiar->parentescoFamiliar = $request->parentescoFamiliar;

            $familiar->save();

            return response()->json([
                'success' => true,
                'message' => 'Familiar criado com sucesso',
                'data' => $familiar
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //API Profissional vai ta Aceitando

public function aceita(Request $request){
   try{
   
    /*
    $aceita =  new ProfissionalServicoModel();

    $aceita -> idProfissional = $request->idProfissional;
    $aceita -> idServico = $request->idServico;
    $aceita -> precoPersonalizado = $request->precoPersonalizado;


    $aceita->save();*/


           $contrato = new ContratoModel();
           $contrato->idProfissionalServico = $request->idProfissionalServico; 
           $contrato->dataInicioContrato = date('Y-m-d');
           $contrato->statusContrato = 'ativo';
           $contrato->obsContrato = '-';
           $contrato->save();

           $servico = servicoModel::find($request->idServico);
           if($servico){
            $servico -> statusServico = "aceito";
            $servico-> save();
           }


          

           /*
        $idosoFamilia = IdosoFamiliaModel::where('idIdosoFamilia', $servico->idIdosoFamilia)->first();
        if ($idosoFamilia) {
            $usuario = UsuarioModel::find($idosoFamilia->idFamiliar); // usuário que vai receber a notificação
            if ($usuario && $usuario->fcm_token) {
                $this->enviarNotificacao(
                    $usuario->fcm_token,
                    'Novo contrato',
                    'Você recebeu um novo contrato!'
                );
            }
        }
*/

    return response()->json([
        'success' => true,
        'message' => 'aceitado e contrato criado :D',
        'data' => [
            'profissionalServico' => $aceita,
            'contrato' => $contrato
        ]
    ], 201);
    

} catch (\Illuminate\Validation\ValidationException $e) {
return response()->json([
    'success' => false,
    'message' => 'Erro de validação',
    'errors' => $e->errors()
], 422);

} catch (\Exception $e) {
return response()->json([
    'success' => false,
    'message' => 'Erro interno do servidor',
    'error' => $e->getMessage()
], 500);
}

}
     public function filtrarServicos(Request $request)
{
    $query = ProfissionalServicoModel::query()
        ->with(['profissional', 'servico']); // relação com ProfissionalModel e servicoModel

    if ($request->has('nomeServico')) {
        $query->whereHas('servico', function($q) use ($request) {
            $q->where('nomeServico', 'like', '%' . $request->nomeServico . '%');
        });
    }

    // Filtro por área do profissional
    if ($request->has('areaProfissional')) {
        $query->whereHas('profissional', function($q) use ($request) {
            $q->where('areaAtuacaoProfissional', 'like', '%' . $request->areaProfissional . '%');
        });
    }

    // Filtro por preço mínimo
    if ($request->has('precoMin')) {
        $query->where('precoPersonalizado', '>=', $request->precoMin);
    }

    // Filtro por preço máximo
    if ($request->has('precoMax')) {
        $query->where('precoPersonalizado', '<=', $request->precoMax);
    }

    $resultados = $query->get();

    return response()->json([
        'success' => true,
        'data' => $resultados
    ]);
}




    public function storeIdosoApi(Request $request)
    {
        try {
           

            $idoso = new IdosoModel();

            $idoso->idUsuario = $request->idUsuario;
            $idoso->necessidadesEspeciais = $request->necessidadesEspeciais;

            $idoso->save();

            return response()->json([
                'success' => true,
                'message' => 'Idoso criado com sucesso',
                'data' => $idoso
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function storeProfissionalApi(Request $request)
    {
        try {
           

            $profissional = new ProfissionalModel();

            $profissional->nomeProfissional = $request->nomeProfissional;
            $profissional->emailProfissional = $request->emailProfissional;
            $profissional->telefoneProfissional = $request->telefoneProfissional;
            $profissional->senhaProfissional = bcrypt($request->senhaProfissional);
            $profissional->documentosProfissional = $request->documentosProfissional;
            $profissional->generoProfissional = $request->generoProfissional;
            $profissional->dataNascProfissional = $request->dataNascProfissional;
            $profissional->statusProfissional = "ativo";
            
            $image = $request->file('fotoProfissional');

            if($image == null){
                $path = "";
            }else{
                $path = $image->store('imagesPicture', 'public');
            }

            $profissional-> fotoProfissional = $path;
            $profissional->save();

            return response()->json([
                'success' => true,
                'message' => 'Profissional criado com sucesso',
                'data' => $profissional
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function storeTelefoneApi(Request $request)
    {
        try {
            
            $telefone = new TelefoneModel();

            $telefone->descTelefone = $request->descTelefone;
            $telefone->save();

            return response()->json([
                'success' => true,
                'message' => 'Telefone criado com sucesso',
                'data' => $telefone
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
