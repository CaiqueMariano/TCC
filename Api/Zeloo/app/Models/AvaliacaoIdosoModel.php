<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvaliacaoIdosoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_avaliacao_idoso';
    protected $primaryKey = 'idAvaliacaoIdoso';

    protected $fillable = [
        'idAvaliacaoIdoso',
        'notaAvaliacao',
        'comentAvaliacao',
        'idUsuario',
        'idContrato'
    ];
}
