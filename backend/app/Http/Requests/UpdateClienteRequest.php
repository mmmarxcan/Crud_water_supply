<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules(): array
    {
        $clienteId = $this->route('cliente');
        
        return [
            'nombre' => 'required|string|max:255',
            'telefono'=> 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:250',
            'email'     => 'nullable|email|max:255|unique:clientes,email,' . $clienteId,
            'activo' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre es Obligatorio ',
            'nombre.max' => 'El nombre no puede superrar los 255 caracteres',
            'email.email' => 'El formato del correo electronico no es valido',
            'activo.boolean' => 'El campo activo debe ser verdarero o falso'
        ];
    }
}
