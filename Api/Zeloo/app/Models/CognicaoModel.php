<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CognicaoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_cognicao';
    protected $primaryKey = 'idCognicao';

    protected $fillable = [
        'idCognicao',
        'nivelCognicao',
        'idPergunta',
    ];
}
