<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class enderecoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_endereco';
    protected $primaryKey = 'idEndereco';

    protected $fillable = [
        'idEndereco',
        'nomeEnderecoUsuario',
        'ruaUsuario',
        'numLogradouroUsuario',
        'estadoUsuario',
        'bairroUsuario',
        'cepUsuario',
        'cidadeUsuario'
    ];
}
