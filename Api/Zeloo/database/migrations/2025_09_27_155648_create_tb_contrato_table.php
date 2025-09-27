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
        Schema::create('tb_contrato', function (Blueprint $table) {
            $table->id('idContrato');
            
            $table->unsignedBigInteger('idProfissionalServico');
            $table->datetime('dataInicioContrato');
            $table->datetime('dataFinalContrato');
            $table->string('statusContrato');
            $table->string('obsContrato');
            $table->timestamps();

            $table->foreign('idProfissionalServico') 
            ->references('idProfissionalServico') 
            ->on('tb_profissional_servico') 
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
        Schema::dropIfExists('tb_contrato');
    }
};
