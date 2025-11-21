<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmocionalModel extends Model
{
    use HasFactory;

    protected $table = 'tb_emocional';
    protected $primaryKey = 'idEmocional';

    protected $fillable = [
        'idEmocional',
        'nivelEmocional',
        'idPergunta',
    ];
}
