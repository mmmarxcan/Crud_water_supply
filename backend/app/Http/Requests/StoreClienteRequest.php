<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class StoreClienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
            'telefono'=> 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:250',
            'email' => 'nullable|email|max:255|unique:clientes,email' ,
            'activo' => 'boolean',
        ];
    }

    #[Override]
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
