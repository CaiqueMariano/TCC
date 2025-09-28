<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagamentoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_pagamento';
    protected $primaryKey = 'idPagamento';

    protected $fillable = [
        'idPagamento',
        'idContrato',
        'idTipoPagamento',
        'valorPagamento',
        'dataPagamento',
        'statusPagamento'
    ];
}
