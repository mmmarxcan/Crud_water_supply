<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suministro extends Model
{
    protected $table = 'suministros';

    protected $fillable = [
        'user_id',
        'cliente',
        'cantidad',
        'estado',
        'activo'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
