<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoritosModel extends Model
{
    use HasFactory;
    protected $table = 'tb_favoritos';
    protected $primaryKey = 'idFavoritos';

    protected $fillable = [
        'idFavoritos',
        'idProfissional',
        'idIdosoFamilia'
    ];
}
