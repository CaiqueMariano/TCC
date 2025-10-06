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
        Schema::create('tb_usuario', function (Blueprint $table) {

            //Normal
            $table->id('idUsuario');
            $table->string('nomeUsuario');
            $table->string('telefoneUsuario')->unique();
            $table->string('emailUsuario')->unique();
            $table->string('senhaUsuario');
            $table->string('statusUsuario');
            $table->date('dataNasc');
            $table->string('tipoUsuario');
 


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
        Schema::dropIfExists('tb_usuario');
    }
};
