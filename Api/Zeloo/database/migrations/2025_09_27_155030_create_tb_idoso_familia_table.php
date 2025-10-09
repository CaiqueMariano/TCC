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
        Schema::create('tb_idoso_familia', function (Blueprint $table) {
            $table->id('idIdosoFamilia');
            $table->unsignedBigInteger('idIdoso');
            $table->unsignedBigInteger('idFamiliar')->nullable();
            $table->timestamps();


            $table->foreign('idIdoso') 
            ->references('idIdoso') 
            ->on('tb_idoso') 
            ->onDelete('cascade');

            $table->foreign('idFamiliar') 
            ->references('idFamiliar') 
            ->on('tb_familiar') 
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
        Schema::dropIfExists('tb_idoso_familia');
    }
};
