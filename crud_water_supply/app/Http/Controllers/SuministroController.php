<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Suministro;

class SuministroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(Suministro::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validacion de datos 
        $dato = $request->validate([
            'user_id' => 'required|exists:users,id',
            'cliente' => 'required|string',
            'cantidad' => 'required|numeric',
        ]);
        $suministro = Suministro::create($dato);

        return response()->json($suministro, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id){
        $suministro = Suministro::findorFail($id);
        $datos = $request->validate([
            'cliente' => 'sometimes|string',
            'cantidad' => 'sometimes|numeric',
            'estado' => 'sometimes|string',
            'activo' => 'sometimes|boolean'
        ]);
        $suministro->update($datos);
        return response()->json($suministro, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $suministro = Suministro::findorFail($id);
        $suministro->delete();
        return response()->json([
            'message' => 'Suministro eliminado exitosamente'
        ], 200);
    }

    public function restore($id){
        $suministro = Suministro::withTrashed()->findorFail($id);
        if($suministro->trashed()){
            $suministro->restore();
            return response()->json([
                'message' => 'Suministro restaurado exitosamente'
            ], 200);
        } else {
            return response()->json([
                'message' => 'El suministro no está eliminado'
            ], 400);
        }
    }
}
