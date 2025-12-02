<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IdosoModel;
use Carbon\Carbon;

class IdosoSeeder extends Seeder
{
    public function run(): void
    {
        IdosoModel::create([
            'idUsuario' => 1,
            'necessidadesEspeciais' => 'Não',
            'created_at' => Carbon::parse('2024-01-15 10:00:00'),
            'updated_at' => Carbon::parse('2024-01-15 11:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 2,
            'necessidadesEspeciais' => 'Sim',
            'created_at' => Carbon::parse('2024-02-10 14:00:00'),
            'updated_at' => Carbon::parse('2024-02-10 15:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 3,
            'necessidadesEspeciais' => 'Não',
            'created_at' => Carbon::parse('2024-03-20 09:00:00'),
            'updated_at' => Carbon::parse('2024-03-20 10:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 4,
            'necessidadesEspeciais' => 'Sim',
            'created_at' => Carbon::parse('2024-04-05 16:00:00'),
            'updated_at' => Carbon::parse('2024-04-05 17:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 5,
            'necessidadesEspeciais' => 'Não',
            'created_at' => Carbon::parse('2024-05-12 08:30:00'),
            'updated_at' => Carbon::parse('2024-05-12 09:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 6,
            'necessidadesEspeciais' => 'Sim',
            'created_at' => Carbon::parse('2024-06-18 13:00:00'),
            'updated_at' => Carbon::parse('2024-06-18 14:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 7,
            'necessidadesEspeciais' => 'Não',
            'created_at' => Carbon::parse('2024-07-21 11:00:00'),
            'updated_at' => Carbon::parse('2024-07-21 12:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 8,
            'necessidadesEspeciais' => 'Sim',
            'created_at' => Carbon::parse('2024-08-09 09:00:00'),
            'updated_at' => Carbon::parse('2024-08-09 10:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 9,
            'necessidadesEspeciais' => 'Não',
            'created_at' => Carbon::parse('2024-09-14 17:00:00'),
            'updated_at' => Carbon::parse('2024-09-14 18:00:00'),
        ]);

        IdosoModel::create([
            'idUsuario' => 10,
            'necessidadesEspeciais' => 'Sim',
            'created_at' => Carbon::parse('2024-10-30 15:00:00'),
            'updated_at' => Carbon::parse('2024-10-30 16:00:00'),
        ]);
    }
}
