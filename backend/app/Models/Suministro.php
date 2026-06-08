<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Suministro extends Model
{
    use HasFactory, SoftDeletes;
    //
    protected $fillable = [
        'cliente_id',
        'cliente',
        'cantidad',
        'estado',
        'activo',
    ];
    // relacion de suministro a usuario 
    public function cliente(){
        return $this->belongsTo(Cliente::class);
    }
}
