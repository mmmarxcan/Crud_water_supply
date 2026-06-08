<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSuministroRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true; 
    }


    public function rules(): array
    {
        return [
            'cliente' => 'required|string|max:255',
            'cantidad' => 'required|integer|min:1',
            'estado' => 'required|string|in:pendiente,completado,cancelado',
        ];
    }


    public function messages(): array
    {
        return [
            'cliente.required' => 'El nombre del cliente es obligatorio.',
            'cantidad.required' => 'La cantidad es obligatoria.',
            'cantidad.integer' => 'La cantidad debe ser un número entero.',
            'cantidad.min' => 'La cantidad debe ser al menos 1.',
            'estado.in' => 'El estado seleccionado no es válido.',
        ];
    }
}
