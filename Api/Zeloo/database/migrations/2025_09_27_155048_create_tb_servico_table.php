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
        Schema::create('tb_servico', function (Blueprint $table) {
            $table->id('idServico');
            $table->string('nomeServico');
            $table->unsignedBigInteger('idIdosoFamilia');
            $table->string('tipoServico');
            $table->string('descServico');
            $table->date('dataServico');
            $table->time('horaInicioServico');
            $table->time('horaTerminoServico');
            $table->unsignedBigInteger('idEndereco');
            $table->timestamps();


            $table->foreign('idIdosoFamilia') 
            ->references('idIdosoFamilia') 
            ->on('tb_idoso_familia') 
            ->onDelete('cascade');

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
        Schema::dropIfExists('tb_servico');
    }
};
