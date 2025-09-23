<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfissionalModel extends Model
{
    use HasFactory;

     protected $table = 'tb_profissional';

    public $fillable = ['idProfissional', 'nomeProfissional', 'emailProfissional', 
    'telefoneUsuario', 'senhaProfissional', 'documentosProfissional', 
    'biografiaProfissional', 'areaAtuacaoProfissional',	'servicosOferecidosProfissional'];
}
