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
        Schema::create('tb_pagamento', function (Blueprint $table) {
            $table->id('idPagamento');
            $table->unsignedBigInteger('idContrato');
            $table->unsignedBigInteger('idTipoPagamento');
            $table->decimal('valorPagamento', 8, 2);
            $table->date('dataPagamento');
            $table->integer('statusPagamento');
            $table->timestamps();

            $table->foreign('idContrato') 
            ->references('idContrato') 
            ->on('tb_contrato') 
            ->onDelete('cascade');

            $table->foreign('idTipoPagamento') 
            ->references('idTipoPagamento') 
            ->on('tb_tipo_pagamento') 
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
        Schema::dropIfExists('tb_pagamento');
    }
};
