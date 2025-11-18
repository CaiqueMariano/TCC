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
        Schema::create('tb_conversa', function (Blueprint $table) {
            $table->id('idConversa');
            $table->unsignedBigInteger('idContrato');
            $table->timestamps();



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
        Schema::dropIfExists('tb_conversa');
    }
};
