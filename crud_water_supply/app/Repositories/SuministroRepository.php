<?php 

namespace App\Repositories;
use App\Models\Suministro;

class SuministroRepository implements SuministroRepositoryInterface{
    public function obtenerTodos(){
        return Suministro::where('activo', true)->get();
    }
    public function obtenerPorId($id){
        return Suministro::where('id', $id)->where('activo', true)->first();
    }
    public function crear(array $datos){
        return Suministro::create($datos);
    }
    public function actualizar($id, array $datos){
        $suministro = Suministro::find($id);
        if($suministro && $suministro->activo){
            $suministro->update($datos);
        }
        return $suministro;
    }
    public function eliminar($id){
        $suministro = Suministro::find($id);
        if($suministro && $suministro->activo){
            $suministro->update(['activo' => false]);
        }
        return $suministro;
    }
    public function Activar($id){
        $suministro = Suministro::find($id);
        if($suministro && !$suministro->activo){
            $suministro->update(['activo' => true]);
        }
        return $suministro;
    }
}
