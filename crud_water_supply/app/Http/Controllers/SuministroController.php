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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
