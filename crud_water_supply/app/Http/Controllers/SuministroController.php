<?php

namespace App\Http\Controllers;
use App\Services\SuministroService;
use Illuminate\Http\Request;

class SuministroController extends Controller {
    protected $servicio;

    public function __construct(SuministroService $servicio) {
        $this->servicio = $servicio;
    }
    public function index(){
        return response()->json($this->servicio->ObtenerTodosLosSuministros());
    }
    public function store(Request $request){
        $datos = $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'nombre_cliente' => 'required|string',
            'cantidad' => 'required|numeric'
        ]);
        return response()->json($this->servicio->CrearSuministro($datos), 201);
    }
    public function update(Request $request, $id){
        return response()->json($this->servicio->ActualizarSuministro($id, $request->all()));
    }
    public function destroy($id){
        return response()->json($this->servicio->EliminarSuministro($id));
    }
    public function activar($id){
        return response()->json($this->servicio->ActivarSuministro($id));
    }
}