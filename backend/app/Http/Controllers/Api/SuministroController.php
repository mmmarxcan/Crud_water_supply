<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSuministroRequest;
use App\Http\Requests\UpdateSuministroRequest;
use App\Services\SuministroService;

class SuministroController extends Controller
{
    protected SuministroService $service;


    public function __construct(SuministroService $service)
    {
        $this->service = $service;
    }


    public function index()
    {
        return $this->service->getAllSuministros();
    }

    public function store(StoreSuministroRequest $request)
    {
        // Delegamos la creación al servicio pasándole los datos ya validados
        $suministro = $this->service->registerSuministro($request->validated());
        return response()->json($suministro, 201); // 201 Created
    }


    public function show(string $id)
    {
        //
    }

    public function update(UpdateSuministroRequest $request, int $id)
    {
        // Delegamos la actualización al servicio pasándole el ID y los datos validados
        $suministro = $this->service->updateSuministro($id, $request->validated());
        return response()->json($suministro);
    }


    public function destroy(string $id)
    {
        // Delegamos la eliminación al servicio
        $this->service->deleteSuministro((int) $id);
        
        return response()->json([
            'message' => 'Suministro eliminado correctamente'
        ], 200);
    }
}
