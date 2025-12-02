<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\UsuarioModel;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        UsuarioModel::create([
            'nomeUsuario' => 'Usuário 1',
            'telefoneUsuario' => '910000001',
            'emailUsuario' => 'user1@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-01',
            'tipoUsuario' => 'admin',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'Usuário 2',
            'telefoneUsuario' => '910000002',
            'emailUsuario' => 'user2@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-02',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'Usuário 3',
            'telefoneUsuario' => '910000003',
            'emailUsuario' => 'user3@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-03',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'Usuário 4',
            'telefoneUsuario' => '910000004',
            'emailUsuario' => 'user4@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-04',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'Usuário 5',
            'telefoneUsuario' => '910000005',
            'emailUsuario' => 'user5@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-05',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'Usuário 6',
            'telefoneUsuario' => '910000006',
            'emailUsuario' => 'user6@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-06',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'Usuário 7',
            'telefoneUsuario' => '910000007',
            'emailUsuario' => 'user7@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-07',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'clemilda',
            'telefoneUsuario' => '910000008',
            'emailUsuario' => 'user8@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-08',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'cleusa',
            'telefoneUsuario' => '910000009',
            'emailUsuario' => 'user9@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-09',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);

        UsuarioModel::create([
            'nomeUsuario' => 'leide',
            'telefoneUsuario' => '910000010',
            'emailUsuario' => 'user10@example.com',
            'senhaUsuario' => Hash::make('123456'),
            'dataNasc' => '2000-01-10',
            'tipoUsuario' => 'cliente',
            'statusUsuario' => 1,
            'fotoUsuario' => null,
            'fcm_token' => null,
        ]);
    }
}
