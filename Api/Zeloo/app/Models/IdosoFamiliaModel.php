<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdosoFamiliaModel extends Model
{
    use HasFactory;

    protected $table = 'tb_idoso_familia';
    protected $primaryKey = 'idIdosoFamilia';

    protected $fillable = [
        'idIdosoFamilia',
        'idIdoso',
        'idFamiliar'
    ];
}