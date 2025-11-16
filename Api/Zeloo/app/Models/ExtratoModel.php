<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtratoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_extrato';
    protected $primaryKey = 'idExtrato';

    protected $fillable = [
        'idExtrato',
        'idProfissional',
        'idContrato',
        'valor',
        'dataExtrato',
        'horarioExtrato'
    ];
}
