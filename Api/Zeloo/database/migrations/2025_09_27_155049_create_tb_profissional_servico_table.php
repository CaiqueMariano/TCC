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
        Schema::create('tb_profissional_servico', function (Blueprint $table) {
            $table->id('idProfissionalServico');
            $table->unsignedBigInteger('idProfissional');
            $table->unsignedBigInteger('idServico');
            $table->decimal('precoPersonalizado', 8, 2);
            $table->timestamps();


            $table->foreign('idProfissional') 
            ->references('idProfissional') 
            ->on('tb_profissional') 
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
        Schema::dropIfExists('tb_profissional_servico');
    }
};
