<?php

namespace App\Services;

use App\Repositories\SuministroRepository;
use App\Models\Suministro;

class SuministroService
{
    protected $repository;

    /**
     * Inyectamos el repositorio por inyección de dependencias de Laravel.
     */
    public function __construct(SuministroRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Obtiene la lista de todos los suministros.
     */
    public function getAllSuministros()
    {
        return $this->repository->all();
    }

    /**
     * Contiene la lógica para registrar un suministro.
     */
    public function registerSuministro(array $data): Suministro
    {
        // En proyectos más grandes, aquí agregarías lógica como:
        // - Enviar un correo al cliente.
        // - Generar una alerta de inventario.
        // - Modificar registros relacionados.
        
        return $this->repository->create($data);
    }

    /**
     * Contiene la lógica para actualizar un suministro.
     */
    public function updateSuministro(int $id, array $data): Suministro
    {
        $suministro = $this->repository->find($id);
        return $this->repository->update($suministro, $data);
    }

    /**
     * Contiene la lógica para eliminar un suministro.
     */
    public function deleteSuministro(int $id): bool
    {
        $suministro = $this->repository->find($id);
        return $this->repository->delete($suministro);
    }
}
