<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerguntaModel extends Model
{
    use HasFactory;

    protected $table = 'tb_pergunta';
    protected $primaryKey = 'idPergunta';

    protected $fillable = [
        'idPergunta',
        'idUsuario',
    ];
}
