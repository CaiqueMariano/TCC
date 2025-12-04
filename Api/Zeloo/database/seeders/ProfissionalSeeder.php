<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\ProfissionalModel;

class ProfissionalSeeder extends Seeder
{
    public function run(): void
    {
        ProfissionalModel::create([
            'nomeProfissional' => 'Carla Mendes',
            'emailProfissional' => 'carla1@email.com',
            'telefoneProfissional' => '11988880001',
            'dataNascProfissional' => '1990-01-01',
            'generoProfissional' => 'Feminino',
            'senhaProfissional' => Hash::make('senha1'),
            'documentosProfissional' => '44900734500',
            'statusProfissional' => 'ativo',
            'fcm_token' => null,
            'fotoProfissional' => null
        ]);

        ProfissionalModel::create([
            'nomeProfissional' => 'Rodrigo Alves',
            'emailProfissional' => 'rodrigo2@email.com',
            'telefoneProfissional' => '11988880002',
            'dataNascProfissional' => '1989-02-01',
            'generoProfissional' => 'Masculino',
            'senhaProfissional' => Hash::make('senha2'),
            'documentosProfissional' => '44900734598',
            'statusProfissional' => 'ativo',
            'fcm_token' => null,
            'fotoProfissional' => null
        ]);

        // Repete para 10 profissionais:

        ProfissionalModel::create([ 'nomeProfissional' => 'Luciana Prado', 'emailProfissional' => 'luciana3@email.com', 'telefoneProfissional' => '11988880003', 'dataNascProfissional' => '1991-03-01', 'generoProfissional' => 'Feminino', 'senhaProfissional' => Hash::make('senha3'), 'documentosProfissional' => '44900733806', 'statusProfissional' => 'ativo']);
        ProfissionalModel::create([ 'nomeProfissional' => 'Tiago Ramos', 'emailProfissional' => 'tiago4@email.com', 'telefoneProfissional' => '11988880004', 'dataNascProfissional' => '1992-04-01', 'generoProfissional' => 'Masculino', 'senhaProfissional' => Hash::make('senha4'), 'documentosProfissional' => '44900733808', 'statusProfissional' => 'ativo']);
        ProfissionalModel::create([ 'nomeProfissional' => 'Fernanda Reis', 'emailProfissional' => 'fernanda5@email.com', 'telefoneProfissional' => '11988880005', 'dataNascProfissional' => '1993-05-01', 'generoProfissional' => 'Feminino', 'senhaProfissional' => Hash::make('senha5'), 'documentosProfissional' => '44900733807', 'statusProfissional' => 'ativo']);
        ProfissionalModel::create([ 'nomeProfissional' => 'Ricardo Moreira', 'emailProfissional' => 'ricardo6@email.com', 'telefoneProfissional' => '11988880006', 'dataNascProfissional' => '1994-06-01', 'generoProfissional' => 'Masculino', 'senhaProfissional' => Hash::make('senha6'), 'documentosProfissional' => '44900733805', 'statusProfissional' => 'ativo']);
        ProfissionalModel::create([ 'nomeProfissional' => 'Mariana Lopes', 'emailProfissional' => 'mariana7@email.com', 'telefoneProfissional' => '11988880007', 'dataNascProfissional' => '1995-07-01', 'generoProfissional' => 'Feminino', 'senhaProfissional' => Hash::make('senha7'), 'documentosProfissional' => '45900733806', 'statusProfissional' => 'ativo']);
        ProfissionalModel::create([ 'nomeProfissional' => 'André Souza', 'emailProfissional' => 'andre8@email.com', 'telefoneProfissional' => '11988880008', 'dataNascProfissional' => '1996-08-01', 'generoProfissional' => 'Masculino', 'senhaProfissional' => Hash::make('senha8'), 'documentosProfissional' => '44900733804', 'statusProfissional' => 'ativo']);
        ProfissionalModel::create([ 'nomeProfissional' => 'Patrícia Dias', 'emailProfissional' => 'patricia9@email.com', 'telefoneProfissional' => '11988880009', 'dataNascProfissional' => '1997-09-01', 'generoProfissional' => 'Feminino', 'senhaProfissional' => Hash::make('senha9'), 'documentosProfissional' => '44900733801', 'statusProfissional' => 'ativo']);
        ProfissionalModel::create([ 'nomeProfissional' => 'João Henrique', 'emailProfissional' => 'joaoh10@email.com', 'telefoneProfissional' => '11988880010', 'dataNascProfissional' => '1998-10-01', 'generoProfissional' => 'Masculino', 'senhaProfissional' => Hash::make('senha10'), 'documentosProfissional' => '44900733802', 'statusProfissional' => 'ativo']);
    }
}
