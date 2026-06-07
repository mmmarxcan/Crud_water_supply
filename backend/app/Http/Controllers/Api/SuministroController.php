<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Suministro;
use Illuminate\Http\Request;

class SuministroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Suministro::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'cliente' => 'required|string|max:255',
            'cantidad' => 'required|integer',
            'estado' => 'required|string'
        ]);

        return Suministro::create($validatedData);
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
    public function update(Request $request, int  $id)
    {
        $suministro = Suministro::findOrFail($id);
        $suministro->update($request->all());
        return response()->json($suministro);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $suministro = Suministro::findOrFail($id);
        $suministro->delete();
        return response()->json([
            'message' => 'Suministro eliminado correctamente'
        ], 200);
    }
}
