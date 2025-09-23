<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Denuncias extends Model
{
    use HasFactory;

    protected $table = 'denuncias';
    protected $primaryKey = 'idDenuncias';

    public $fillable = ['idDenuncias',	'idUsuario'	,'motivoDenuncia'	,'descDenuncia',	'evidenciaDenuncia'	];
}
