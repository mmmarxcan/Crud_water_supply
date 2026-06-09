<?php

namespace App\Services;

use App\Repositories\ClienteRepository;
use App\Models\Cliente;

class ClienteService{
   
    private ClienteRepository $clienteRepository;
    
    public function __construct(ClienteRepository  $clienteRepository)
    {
        $this->clienteRepository = $clienteRepository;
    }

    public function getAllClientes(){
        return $this->clienteRepository->all();
    }
    public function registerCliente(array $data): Cliente{
        return $this->clienteRepository->create($data);
    }
    public function updateCliente(int $id , array $data): Cliente{
        $cliente = $this->clienteRepository->find($id);
        return $this->clienteRepository->update($cliente, $data);
    }
    
    public function  deleteCliente(int $id): bool {
        $cliente = $this->clienteRepository->find($id);
        if(!$cliente){
            throw new \Exception("Cliente no encontrado");
        }
        return $this->clienteRepository->delete($cliente);
    }
}