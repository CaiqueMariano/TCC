<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicamentosModel extends Model
{
    use HasFactory;

    protected $table = 'tb_medicamentos';
    protected $primaryKey = 'idMedicamentos';

    protected $fillable = [
        'idMedicamentos',
        'tipoMedicamento',
        'idPergunta',
    ];
}
