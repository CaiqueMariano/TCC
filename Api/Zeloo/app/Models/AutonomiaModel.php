<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutonomiaModel extends Model
{
    use HasFactory;

    protected $table = 'tb_autonomia';
    protected $primaryKey = 'idAutonomia';

    protected $fillable = [
        'idAutonomia',
        'nivelAutonomia',
        'idPergunta',
    ];
}
