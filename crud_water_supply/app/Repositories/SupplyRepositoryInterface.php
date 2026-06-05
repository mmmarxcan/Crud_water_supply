<?php

namespace App\Repositories;

interface SupplyRepositoryInterface{
    public function obtenerTodos();
    public function obtenerPorId($id);
    public function crear(array $datos);
    public function actualizar($id, array $datos);
    public function eliminar($id);
    public function Activar($id);
}