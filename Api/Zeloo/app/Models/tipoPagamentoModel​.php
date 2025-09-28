<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tipoPagamentoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_tipo_pagamento';
    protected $primaryKey = 'idTipoPagamento';

    protected $fillable = [
        'idTipoPagamento',
        'tipoPagamento'
    ];
}
