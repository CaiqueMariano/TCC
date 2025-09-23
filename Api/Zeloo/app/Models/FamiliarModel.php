<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamiliarModel extends Model
{
    use HasFactory;
    
    protected $table = 'tb_familiar';

    public $fillable = ['idFamiliar', 'idUsuario', 'parentescoFamiliar'];
}
