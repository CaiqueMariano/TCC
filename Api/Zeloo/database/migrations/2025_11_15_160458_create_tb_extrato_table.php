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
        Schema::create('tb_extrato', function (Blueprint $table) {
            $table->id('idExtrato');
            $table->unsignedBigInteger('idProfissional');
            $table->unsignedBigInteger('idContrato');
            $table->decimal('valor', 10, 2);
            $table->date('dataExtrato');
            $table->time('horarioExtrato');
            $table->timestamps();

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
        Schema::dropIfExists('tb_extrato');
    }
};
