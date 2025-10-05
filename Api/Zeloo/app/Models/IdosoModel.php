<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdosoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_idoso';
    protected $primaryKey = 'idIdoso';
    public $fillable = ['idIdoso',	'idUsuario', 'necessidadesEspeciais'];
}
