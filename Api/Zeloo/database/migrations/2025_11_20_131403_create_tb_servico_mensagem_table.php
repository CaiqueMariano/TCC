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
        Schema::create('tb_servico_mensagem', function (Blueprint $table) {
            $table->id('idServicoMensagem');
            $table->unsignedBigInteger('idConversa');
            $table->unsignedBigInteger('idServico');
            $table->timestamps();



            $table->foreign('idConversa') 
            ->references('idConversa') 
            ->on('tb_conversa') 
            ->onDelete('cascade');

            
            $table->foreign('idServico') 
            ->references('idServico') 
            ->on('tb_servico') 
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
        Schema::dropIfExists('tb_servico_mensagem');
    }
};
