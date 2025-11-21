<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComportamentoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_comportamento';
    protected $primaryKey = 'idComportamento';

    protected $fillable = [
        'idComportamento',
        'tipoComportamento',
        'idPergunta',
    ];
}
