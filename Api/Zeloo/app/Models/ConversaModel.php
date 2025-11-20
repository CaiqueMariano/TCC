<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversaModel extends Model
{
    use HasFactory;
    protected $table = 'tb_conversa';
    protected $primaryKey = 'idConversa';

    protected $fillable = [
        'idConversa',
        'idContrato'
    ];
}
