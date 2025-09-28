<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvaliacaoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_avaliacao';
    protected $primaryKey = 'idAvaliacao';

    protected $fillable = [
        'idAvaliacao',
        'notaAvaliacao',
        'dataAvaliacao',
        'comentAvaliacao'
    ];
}
