<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfissionalServicoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_profissional_servico';
    protected $primaryKey = 'idProfissionalServico';

    protected $fillable = [
        'idProfissionalServico',
        'idProfissional',
        'idServico',
        'precoPersonalizado'
    ];
}
