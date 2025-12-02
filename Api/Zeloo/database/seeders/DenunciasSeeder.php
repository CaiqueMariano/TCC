<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Denuncias;

class DenunciasSeeder extends Seeder
{
    public function run(): void
    {
        Denuncias::create(['idUsuario' => 1, 'motivoDenuncia' => 'Abandono', 'descDenuncia' => 'Descrição 1', 'evidenciaDenuncia' => 'evi1.jpg']);
        Denuncias::create(['idUsuario' => 2, 'motivoDenuncia' => 'Agressão', 'descDenuncia' => 'Descrição 2', 'evidenciaDenuncia' => 'evi2.jpg']);
        Denuncias::create(['idUsuario' => 3, 'motivoDenuncia' => 'Negligência', 'descDenuncia' => 'Descrição 3', 'evidenciaDenuncia' => 'evi3.jpg']);
        Denuncias::create(['idUsuario' => 4, 'motivoDenuncia' => 'Maus-tratos', 'descDenuncia' => 'Descrição 4', 'evidenciaDenuncia' => 'evi4.jpg']);
        Denuncias::create(['idUsuario' => 5, 'motivoDenuncia' => 'Risco à saúde', 'descDenuncia' => 'Descrição 5', 'evidenciaDenuncia' => 'evi5.jpg']);
        Denuncias::create(['idUsuario' => 6, 'motivoDenuncia' => 'Ameaça', 'descDenuncia' => 'Descrição 6', 'evidenciaDenuncia' => 'evi6.jpg']);
        Denuncias::create(['idUsuario' => 7, 'motivoDenuncia' => 'Violência verbal', 'descDenuncia' => 'Descrição 7', 'evidenciaDenuncia' => 'evi7.jpg']);
        Denuncias::create(['idUsuario' => 8, 'motivoDenuncia' => 'Exploração', 'descDenuncia' => 'Descrição 8', 'evidenciaDenuncia' => 'evi8.jpg']);
        Denuncias::create(['idUsuario' => 9, 'motivoDenuncia' => 'Abuso psicológico', 'descDenuncia' => 'Descrição 9', 'evidenciaDenuncia' => 'evi9.jpg']);
        Denuncias::create(['idUsuario' => 10, 'motivoDenuncia' => 'Outra', 'descDenuncia' => 'Descrição 10', 'evidenciaDenuncia' => 'evi10.jpg']);
    }
}
