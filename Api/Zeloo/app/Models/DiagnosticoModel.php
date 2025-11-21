<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiagnosticoModel extends Model
{
    use HasFactory;

    protected $table = 'tb_diagnostico';
    protected $primaryKey = 'idDiagnostico';

    protected $fillable = [
        'idDiagnostico',
        'doencaDiagnostico',
        'alergiaDiagnostico',
        'idPergunta',
    ];
}
