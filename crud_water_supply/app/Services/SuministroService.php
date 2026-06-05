<?php

namespace App\Services;
use App\Repositories\SupplyRepositoryInterface;

class SuministroService{
    protected $repository;

    public function __construct(SupplyRepositoryInterface $repository){
        $this->repository = $repository;
    }
    public function ObtenerTodosLosSuministros(){
        return $this->repository->obtenerTodos();
    }
    public function CrearSuministro(array $data){
        return $this->repository->crear($data);
    }
    public function ObtenerSuministroPorId(int $id){
        return $this->repository->obtenerPorId($id);
    }
    public function ActualizarSuministro(int $id, array $datos){
        return $this->repository->actualizar($id, $datos);
    }
    public function EliminarSuministro(int $id){
        return $this->repository->eliminar($id);
    }
    public function ActivarSuministro(int $id){
        return $this->repository->Activar($id);
    }
}