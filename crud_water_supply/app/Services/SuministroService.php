<?php

namespace App\Repositories;
use App\Repositories\SuministroRepositoryInterface;

class SuministroService{
    protected $repository;

    public function __construct(SuministroRepositoryInterface $repository){
        $this->repository = $repository;
    }
    public function ObtenerTodosLosSuministros(){
        return $this->repository->obtenerTodos();
    }
    public function CrearSuministro($data){
        return $this->repository->crear($data);
    }
    public function ObtenerSuministroPorId($id){
        return $this->repository->obtenerPorId($id);
    }
    public function ActualizarSuministro($id, array $datos){
        return $this->repository->actualizar($id, $datos);
    }
    public function EliminarSuministro($id){
        return $this->repository->eliminar($id);
    }
    public function ActivarSuministro($id){
        return $this->repository->Activar($id);
    }
}