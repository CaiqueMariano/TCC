<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContratoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_contrato';
    protected $primaryKey = 'idContrato';

    protected $fillable = [
        'idContrato',
        'idProfissionalServico',
        'dataInicioContrato',
        'dataFinalContrato',
        'statusContrato',
        'obsContrato'
    ];
}
