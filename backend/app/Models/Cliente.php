<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use HasFactory, SoftDeletes ;

    protected $fillable = [
        'nombre',
        'telefono',
        'direccion',
        'email',
        'activo'
    ];
    // relacion de un cliente a muchos suministros 
    public function suministros(){
        return $this->hasMany(Suministro::class);
    }
}

