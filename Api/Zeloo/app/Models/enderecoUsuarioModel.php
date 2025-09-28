<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class enderecoUsuarioModel extends Model
{
    use HasFactory;

    protected $table = 'tb_endereco_usuario';
    protected $primaryKey = 'idEnderecoUsuario';

    protected $fillable = [
        'idEnderecoUsuario',
        'idIdosoFamilia',
        'idEndereco'
    ];
}
