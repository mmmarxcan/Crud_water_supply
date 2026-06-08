<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSuministroRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cliente' => 'sometimes|required|string|max:255',
            'cantidad' => 'sometimes|required|integer|min:1',
            'estado' => 'sometimes|required|string|in:pendiente,completado,cancelado',
        ];
    }


    public function messages(): array
    {
        return [
            'cliente.string' => 'El nombre del cliente debe ser un texto válido.',
            'cantidad.integer' => 'La cantidad debe ser un número entero.',
            'cantidad.min' => 'La cantidad debe ser al menos 1.',
            'estado.in' => 'El estado seleccionado no es válido.',
        ];
    }
}
