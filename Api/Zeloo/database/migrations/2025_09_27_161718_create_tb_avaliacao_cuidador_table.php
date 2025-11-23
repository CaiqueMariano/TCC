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
        Schema::create('tb_avaliacao_cuidador', function (Blueprint $table) {
            $table->id('idAvaliacaoCuidador');
            $table->integer('notaAvaliacao');
            $table->string('comentAvaliacao');
            $table->timestamps();

            $table->unsignedBigInteger('idProfissional');
            $table->unsignedBigInteger('idContrato');

      
            $table->foreign('idProfissional') 
            ->references('idProfissional') 
            ->on('tb_profissional') 
            ->onDelete('cascade');

            $table->foreign('idContrato') 
            ->references('idContrato') 
            ->on('tb_contrato') 
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
        Schema::dropIfExists('tb_avaliacao_cuidador');
    }
};
