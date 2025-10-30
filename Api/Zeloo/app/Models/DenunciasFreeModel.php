<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DenunciasFreeModel extends Model
{
    use HasFactory;
    protected $table = 'tb_denuncias_free';
    protected $primaryKey = 'idDenunciasFree';

    public $fillable = ['idDenunciasFree',	'idProfissional','motivoDenuncia'	,'descDenuncia',	'evidenciaDenuncia'	];
}
