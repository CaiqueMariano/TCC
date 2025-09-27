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
        Schema::create('tb_avaliacao_contrato', function (Blueprint $table) {
            $table->id('idAvaliacaoContrato');
            $table->unsignedBigInteger('idAvaliacao');
            $table->unsignedBigInteger('idContrato');
            $table->timestamps();

            $table->foreign('idContrato') 
            ->references('idContrato') 
            ->on('tb_contrato') 
            ->onDelete('cascade');

            $table->foreign('idAvaliacao') 
            ->references('idAvaliacao') 
            ->on('tb_avaliacao') 
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
        Schema::dropIfExists('tb_avaliacao_contrato');
    }
};
