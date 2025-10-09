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
        Schema::create('tb_denuncias_free', function (Blueprint $table) {
            $table->id('idDenunciasFree');
            $table->unsignedBigInteger('idProfissional');
            $table->string('motivoDenuncia');
            $table->string('descDenuncia');
            $table->string('evidenciaDenuncia');
            $table->timestamps();


            $table->foreign('idProfissional') 
            ->references('idProfissional') 
            ->on('tb_profissional') 
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
        Schema::dropIfExists('tb_denuncias_free');
    }
};
