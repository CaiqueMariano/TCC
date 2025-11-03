<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfissionalModel extends Model
{
    use HasFactory;

     protected $table = 'tb_profissional';
     protected $primaryKey = 'idProfissional';

    public $fillable = ['idProfissional', 'nomeProfissional', 'emailProfissional', 
    'telefoneUsuario', 'senhaProfissional', 'documentosProfissional', 
    'biografiaProfissional','valorMin', 'areaAtuacaoProfissional',	'servicosOferecidosProfissional', 'statusProfissional', 'fotoProfissional'];
}
