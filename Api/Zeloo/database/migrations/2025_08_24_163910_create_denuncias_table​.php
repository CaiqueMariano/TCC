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
        Schema::create('denuncias', function (Blueprint $table) {

            $table->id('idDenuncias');
            $table->unsignedBigInteger('idUsuario');
            $table->string('motivoDenuncia');
            $table->string('descDenuncia');
            $table->string('evidenciaDenuncia');
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
        //
    }
};
