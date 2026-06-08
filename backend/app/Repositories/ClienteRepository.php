<?php

namespace App\Repositories;
use App\Models\Cliente;

class ClienteRepository {
    //obtenemos todos los datos
    public function all(){
        return Cliente::all();
    }
    // buscamos por id
    public function find(int $id): Cliente{
        return Cliente::findOrFail($id);
    }
    // creamos los clientes en la base de datos
    public function create(array $data) : Cliente{
        return Cliente::create($data);
    }
    // actualizamos los clientes de la base de datos
    public function update(Cliente $cliente , array $data){
        $cliente->update($data);
        return $cliente;
    }
    // eliminamos los clientes 

    public function delete(Cliente $cliente ): bool {
        return $cliente-> delete();
    }
}