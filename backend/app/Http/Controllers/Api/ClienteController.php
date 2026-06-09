<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use App\Services\ClienteService;
use Illuminate\Http\JsonResponse;

class ClienteController extends Controller
{
    protected ClienteService $clienteService;

    public function __construct(ClienteService $clienteService){
        $this->clienteService = $clienteService;
    }
    public function index(): JsonResponse{
        return response()->json($this->clienteService->getAllClientes());
    }
    public function store(StoreClienteRequest $request): JsonResponse{
        $cliente = $this->clienteService->registerCliente($request->validated());
        return response()->json($cliente, 200);
    }
    public function update(UpdateClienteRequest $request, int $id): JsonResponse{
        $cliente = $this->clienteService->updateCliente($id , $request->validated());
        return response()->json($cliente, 200);
    }
    public function deleteCliente(int $id): JsonResponse {
        $this->clienteService->deleteCliente($id);
        return response()->json(['message' => 'Cliente eliminado correctamente'], 200);
    }
}
