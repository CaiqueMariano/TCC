<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_endereco', function (Blueprint $table) {
            $table->id('idEndereco');
                   //Endereço
                   $table->string('ruaUsuario');
                   $table->string('nomeEndereco');
                   $table->string('numLogradouroUsuario');
                   $table->string('estadoUsuario');
                   $table->string('bairroUsuario');
                   $table->string('cepUsuario');
                   $table->string('cidadeUsuario');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_endereco');
    }
};
