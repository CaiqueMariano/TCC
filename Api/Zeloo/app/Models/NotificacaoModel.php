<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificacaoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_notificacao';

    protected $fillable = [
        'id',
        'idUsuario',
    ];
}
