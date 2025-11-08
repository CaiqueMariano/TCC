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
        Schema::create('tb_favoritos', function (Blueprint $table) {
            $table->id('idFavoritos');
            $table->unsignedBigInteger('idProfissional');
            $table->unsignedBigInteger('idIdosoFamilia');
            $table->timestamps();


            $table->foreign('idProfissional') 
            ->references('idProfissional') 
            ->on('tb_profissional') 
            ->onDelete('cascade');

            $table->foreign('idIdosoFamilia') 
            ->references('idIdosoFamilia') 
            ->on('tb_idoso_familia') 
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
        Schema::dropIfExists('tb_favoritos');
    }
};
