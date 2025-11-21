<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HigieneModel extends Model
{
    use HasFactory;

    protected $table = 'tb_higiene';
    protected $primaryKey = 'idHigiene';

    protected $fillable = [
        'idHigiene',
        'nivelHigiene',
        'idPergunta',
    ];
}
