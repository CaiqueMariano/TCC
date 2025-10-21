<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use App\Models\servicoModel;
use App\Models\enderecoModel; 
use App\Models\enderecoUsuarioModel; 
use App\Models\User;
use App\Models\IdosoFamiliaModel;
use App\Models\UsuarioModel;
use App\Models\Denuncias;
use App\Models\ContratoModel;
use App\Models\FamiliarModel;
use App\Models\IdosoModel;
use App\Models\ProfissionalModel;
use App\Models\ProfissionalServicoModel;
use App\Models\TelefoneModel;
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

    public function registro()
    {
        return view('nenhum-registro');
    }


    public function login()
    {
        return view('login');
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

    /*BANIR USUARIO*/
    public function destroyUsuario($idUsuario)
    {

        
        if (Denuncias::exists()) {
            UsuarioModel::where('idUsuario', '=', $idUsuario)->update(['statusUsuario' => 'inativo']);
           
            return redirect()->route('denuncias')
                            ->with('success', 'Usuário banido com sucesso');
        } else {
            return redirect()->route('registro'); 
        }
    }
    public function desbanirUsuario($idUsuario)
    {

        
        if (Denuncias::exists()) {
            UsuarioModel::where('idUsuario', '=', $idUsuario)->update(['statusUsuario' => 'ativo']);
            Denuncias::where('idUsuario', '=', $idUsuario)->delete();
            return redirect()->route('denuncias')
                            ->with('success', 'Usuário banido com sucesso');
        } else {
            return redirect()->route('registro'); 
        }
    }


/*VER DENUCNIAS*/
    public function denuncias(){

        if(Denuncias::exists()){
        $usuarios = DB::table('denuncias')
        ->join('tb_usuario','denuncias.idUsuario', '=', 'tb_usuario.idUsuario')
        ->where('tb_usuario.statusUsuario', '=', 'ativo')
        ->select(
            'tb_usuario.idUsuario',
            'tb_usuario.nomeUsuario',
            'tb_usuario.tipoUsuario',
            'denuncias.motivoDenuncia',
            'denuncias.descDenuncia',
            'denuncias.evidenciaDenuncia'

        )
        ->paginate(10);


        return view('denuncias', compact('usuarios'));
        }else{
            return view('nenhum-registro');
        }
    }

    //VER DENUNCIADOS
     public function denunciados(){

        if(Denuncias::exists()){
        $usuarios = DB::table('denuncias')
        ->join('tb_usuario','denuncias.idUsuario', '=', 'tb_usuario.idUsuario')
        ->where('tb_usuario.statusUsuario', '=', 'inativo')
        ->select(
            'tb_usuario.idUsuario',
            'tb_usuario.nomeUsuario',
            'tb_usuario.tipoUsuario',
            'denuncias.motivoDenuncia',
            'denuncias.descDenuncia',
            'denuncias.evidenciaDenuncia'

        )
        ->paginate(10);


        return view('responder-denuncia', compact('usuarios'));
        }else{
            return view('nenhum-registro');
        }
    }


    public function banir(){
        return view('banir');
    }

    public function responder(){
        return view('responder');
    }


    /*Funcões da API*/ 


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


      /*CRIACÃO DE SERVICO*/
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
      }

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
            $servico -> horaInicioServico = $request -> horaInicioServico;
            $servico -> horaTerminoServico = $request -> horaTerminoServico;
            $servico -> idEndereco= $request -> idEndereco;

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

    public function updatePerfil(Request $request, $idUsuario){
        UsuarioModel::where('idUsuario', $idUsuario)->update([
            'nomeUsuario' => $request->nomeUsuario,
            'telefoneUsuario' => $request-> telefoneUsuario,
            'emailUsuario' => $request-> emailUsuario,
            'dataNasc' => $request-> dataNasc,
            'numLogradouroUsuario' => $request-> numLogradouroUsuario,
            'ruaUsuario' => $request-> ruaUsuario,
            'estadoUsuario' => $request-> estadoUsuario,
            'bairroUsuario' => $request-> bairroUsuario,
            'cepUsuario' => $request-> cepUsuario,
            'cidadeUsuario' => $request-> cidadeUsuario,

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
        $servicos = servicoModel::all();

        if(!$servicos){
            return response()->json([
                'success' => false,
                'message' => 'erro'
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'sucesso ao buscar serviços' ,
            'data' => $servicos
        ], 200);
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
    
        if (!$usuario || !Hash::check($request->senhaProfissional, $usuario->senhaProfissional)) {
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
        $usuario->senhaUsuario = bcrypt($request->senhaUsuario);
        $usuario->dataNasc = $request->dataNasc;
        $usuario->tipoUsuario = $request->tipoUsuario;
        $usuario->statusUsuario = 'ativo';

        $usuario->save();

//SE FOR IDOSO VAI PRA TABELA IDOSO
        if($usuario->tipoUsuario === 'idoso')
        {
        $idoso = new IdosoModel();
        $idoso->idUsuario = $usuario->idUsuario;

        $idoso->save();

        //O IDOSO VAI PRA TAEBLA FAMILIA
        $idosoFamilia = new IdosoFamiliaModel();

        $idosoFamilia->idIdoso = $idoso->idIdoso;

        $idosoFamilia->save();
        }else{

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


//CRIAR CONTRATO
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
}

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
   
    $aceita =  new ProfissionalServicoModel();

    $aceita -> idProfissional = $request->idProfissional;
    $aceita -> idServico = $request->idServico;
    $aceita -> precoPersonalizado = $request->precoPersonalizado;


    $aceita->save();


           $contrato = new ContratoModel();
           $contrato->idProfissionalServico = $aceita->idProfissionalServico; 
           $contrato->dataInicioContrato = date('Y-m-d');
           $contrato->statusContrato = 'inativo';
           $contrato->obsContrato = '-';
           $contrato->save();

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
            $profissional->valorMin = $request->valorMin;
            $profissional->senhaProfissional = bcrypt($request->senhaProfissional);
            $profissional->documentosProfissional = $request->documentosProfissional;
            $profissional->biografiaProfissional = $request->biografiaProfissional;
            $profissional->areaAtuacaoProfissional = $request->areaAtuacaoProfissional;
            $profissional->servicosOferecidosProfissional = $request->servicosOferecidosProfissional;
       
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
