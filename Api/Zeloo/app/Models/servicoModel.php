<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class servicoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_servico';
    protected $primaryKey = 'idServico';

    protected $fillable = [
        'idServico',
        'nomeServico',
        'idIdosoFamilia',
        'tipoServico',
        'descServico',
        'generoServico',
        'dataServico',
        'horaInicioServico',
        'horaTerminoServico',
        'idEndereco',
        'statusServico'
    ];
}
