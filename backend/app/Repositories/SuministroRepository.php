<?php

namespace App\Repositories;

use App\Models\Suministro;

class SuministroRepository
{
    /**
     * Obtiene todos los suministros de la base de datos.
     */
    public function all()
    {
        return Suministro::all();
    }

    /**
     * Busca un suministro por su ID.
     */
    public function find(int $id): Suministro
    {
        return Suministro::findOrFail($id);
    }

    /**
     * Guarda un nuevo suministro en la base de datos.
     */
    public function create(array $data): Suministro
    {
        return Suministro::create($data);
    }

    /**
     * Actualiza un suministro existente.
     */
    public function update(Suministro $suministro, array $data): Suministro
    {
        $suministro->update($data);
        return $suministro;
    }

    /**
     * Elimina un suministro .
     */
    public function delete(Suministro $suministro): bool
    {
        return $suministro->delete();
    }
}
