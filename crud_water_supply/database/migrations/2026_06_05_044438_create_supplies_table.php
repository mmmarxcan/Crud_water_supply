<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    public function up(): void{
        Schema::create('suministros', function (Blueprint $table){
            $table->id();
            $table->foreignId('usuario_id')->constrained('usuarios');
            $table->decimal('cantidad', 8,2);
            $table->string('estado')->default('pendiente'); // pendiente , entregado , cancelado
            $table->boolean('activo')->default(true); // agregamos esto para soft delete
            $table->timestamps();
        });
    }
    public function down(): void{
        Schema::dropIfExists('suministros');
    }
};