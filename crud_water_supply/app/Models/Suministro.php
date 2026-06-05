<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suministro extends Model
{
    protected $fillable = [
        'usuario_id',
        'nombre_cliente',
        'litros',
        'estado',
        'activo' 
    ];
}
