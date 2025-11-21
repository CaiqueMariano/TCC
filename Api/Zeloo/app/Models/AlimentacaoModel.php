<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlimentacaoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_alimentacao';
    protected $primaryKey = 'idAlimentacao';

    protected $fillable = [
        'idAlimentacao',
        'tipoAlimentacao',
        'descAlimentacao',
        'idPergunta',
    ];
}
