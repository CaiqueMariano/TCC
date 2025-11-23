<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvaliacaoCuidadorModel extends Model
{
    use HasFactory;

    protected $table = 'tb_avaliacao_cuidador';
    protected $primaryKey = 'idAvaliacaoCuidador';

    protected $fillable = [
        'idAvaliacaoCuidador',
        'notaAvaliacao',
        'comentAvaliacao',
        'idProfissional',
        'idContrato'
    ];
}
