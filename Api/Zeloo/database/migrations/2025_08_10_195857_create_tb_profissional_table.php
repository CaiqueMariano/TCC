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
        Schema::create('tb_profissional', function (Blueprint $table) {
            $table->id('idProfissional');
            $table->string('nomeProfissional');
            $table->string('emailProfissional');
            $table->string('telefoneProfissional');
            $table->date('dataNascProfissional');
            $table->string('generoProfissional');
            $table->string('senhaProfissional');
            $table->bigInteger('documentosProfissional');
            $table->string('biografiaProfissional');
            $table->decimal('valorMin', 8, 2);
            $table->string('statusProfissional');
            $table->string('fotoProfissional')->nullable();
            $table->timestamps();

            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_profissional');
    }
};
