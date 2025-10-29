<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfissionalServicoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_profissional_servico';
    protected $primaryKey = 'idProfissionalServico';

    protected $fillable = [
        'idProfissionalServico',
        'idProfissional',
        'idServico',
        'precoPersonalizado'
    ];

    // Relação com o profissional
    public function profissional() {
        return $this->belongsTo(ProfissionalModel::class, 'idProfissional');
    }

    // Relação com o serviço
    public function servico() {
        return $this->belongsTo(servicoModel::class, 'idServico');
    }
}
