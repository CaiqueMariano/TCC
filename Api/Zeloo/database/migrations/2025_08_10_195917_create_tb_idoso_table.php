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
        Schema::create('tb_idoso', function (Blueprint $table) {
            $table->id('idIdoso');
            $table->unsignedBigInteger('idUsuario');
            $table->string('necessidadesEspeciais');
            $table->timestamps();


            $table->foreign('idUsuario') 
            ->references('idUsuario') 
            ->on('tb_usuario') 
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
        Schema::dropIfExists('tb_idoso');
    }
};
