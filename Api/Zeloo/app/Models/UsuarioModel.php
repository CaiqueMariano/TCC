<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

class UsuarioModel extends Model
{
    use HasFactory;

    protected $table = 'tb_usuario';
    protected $primaryKey = 'idUsuario';

    public $fillable = ['idUsuario','nomeUsuario','telefoneUsuario','emailUsuario','senhaUsuario','dataNasc',
    'tipoUsuario', 'statusUsuario', 'fotoUsuario'];

//public $timestamps = false;
public function getAuthPassword()
{
    return $this->senhaUsuario;
}



}
