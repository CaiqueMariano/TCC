<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TelefoneModel extends Model
{
    use HasFactory;

    protected $table = 'tb_telefone_usuario';

    public $fillable = ['idTelefoneUsuario', 'descTelefone'];
}
