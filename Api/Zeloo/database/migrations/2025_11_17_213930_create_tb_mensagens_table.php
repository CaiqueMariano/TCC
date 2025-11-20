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
        Schema::create('tb_mensagens', function (Blueprint $table) {
            $table->id('idMensagens');
            $table->unsignedBigInteger('idConversa');
            $table->string('remententeConversa');
            $table->string('tipoMensagens');
            $table->string('conteudoMensagens')->nullable();
            $table->string('arquivoMensagens')->nullable();
            $table->timestamps();

            $table->foreign('idConversa') 
            ->references('idConversa') 
            ->on('tb_conversa') 
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
        Schema::dropIfExists('tb_mensagens');
    }
};
