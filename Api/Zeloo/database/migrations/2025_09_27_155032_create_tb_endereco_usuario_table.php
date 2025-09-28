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
        Schema::create('tb_endereco_usuario', function (Blueprint $table) {
            $table->id('idEnderecoUsuario');
            $table->unsignedBigInteger('idIdosoFamilia');
            $table->unsignedBigInteger('idEndereco');

      
            $table->foreign('idIdosoFamilia') 
            ->references('idIdosoFamilia') 
            ->on('tb_idoso_familia') 
            ->onDelete('cascade');
            $table->timestamps();

            $table->foreign('idEndereco') 
            ->references('idEndereco') 
            ->on('tb_endereco') 
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_endereco_usuario');
    }
};
