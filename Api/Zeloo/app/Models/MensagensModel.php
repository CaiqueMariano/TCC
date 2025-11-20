<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MensagensModel extends Model
{
    use HasFactory;

    protected $table = 'tb_mensagens';
    protected $primaryKey = 'idMensagens';

    protected $fillable = [
        'idMensagens',
        'idRemetente',
        'tipoMensagens',
        'conteudoMensagens',
        'arquivoMensagens',
    ];
}
