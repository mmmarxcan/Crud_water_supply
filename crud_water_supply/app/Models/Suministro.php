<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Suministro extends Model
{
    use SoftDeletes;

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
