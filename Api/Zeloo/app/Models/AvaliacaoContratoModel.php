<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvaliacaoContratoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_avaliacao_contrato';
    protected $primaryKey = 'idAvaliacaoContrato';

    protected $fillable = [
        'idAvaliacaoContrato',
        'idAvaliacao',
        'idContrato'
    ];
}
