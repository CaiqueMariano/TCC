<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use App\Models\servicoModel;
use App\Models\User;
use App\Models\UsuarioModel;
use App\Models\Denuncias;
use App\Models\FamiliarModel;
use App\Models\IdosoModel;
use App\Models\ProfissionalModel;
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
            UsuarioModel::where('idUsuario', '=', $idUsuario)->delete();

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

    public function banir(){
        return view('banir');
    }

    public function responder(){
        return view('responder');
    }


    /*Funcões da API*/ 


      /*CRIACÃO DE SERVICO*/
      public function storeServico(Request $request){
        try{
            $servico = new servicoModel();

            $servico -> nomeServico =$request ->nomeServico;
            $servico -> idIdosoFamilia = $request ->idIdosoFamilia;
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

    public function loginUsuario(Request $request)
    {
        $usuario = UsuarioModel::where('telefoneUsuario', $request->telefoneUsuario)->first();

    if (!$usuario || !Hash::check($request->senhaUsuario, $usuario->senhaUsuario)) {
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

    public function storeUsuarioApi(Request $request)
{
    try {
        $usuario = new UsuarioModel();

        $usuario->nomeUsuario = $request->nomeUsuario;
        $usuario->telefoneUsuario = $request->telefoneUsuario;
        $usuario->emailUsuario = $request->emailUsuario;
        $usuario->senhaUsuario = bcrypt($request->senhaUsuario);
        $usuario->dataNasc = $request->dataNasc;
        $usuario->tipoUsuario = $request->tipoUsuario;

        $usuario->save();

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
