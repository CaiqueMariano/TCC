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
        Schema::create('tb_alimentacao', function (Blueprint $table) {
            $table->id('idAlimentacao');
            $table->string('tipoAlimentacao');
            $table->string('descAlimentacao')->nullable();
            $table->timestamps();


            $table->unsignedBigInteger('idPergunta');
            
            $table->foreign('idPergunta') 
            ->references('idPergunta') 
            ->on('tb_pergunta') 
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
        Schema::dropIfExists('tb_alimentacao');
    }
};
