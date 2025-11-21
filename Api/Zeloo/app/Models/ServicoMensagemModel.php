<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicoMensagemModel extends Model
{
    use HasFactory;

    protected $table = 'tb_servico_mensagem';
    protected $primaryKey = 'idServicoMensagem';
    public $fillable = ['idConversa',	'idServico'];
}
