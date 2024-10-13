<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'keyword' => 'nullable',
            'page' => ['nullable', 'numeric'],
            'limit' => ['nullable', 'numeric'],
        ];
    }

    public function getKeyword(): ?string
    {
        return $this->input('keyword', '');
    }

    public function getPage(): int
    {
        return (int) $this->input('page', 1); // page default to 1.
    }

    public function getLimit(): int
    {
        return (int) $this->input('limit', config('search.results_per_page')); // set via config
    }

    public function getOrder(): string
    {
        return $this->input('order', 'desc');
    }

    public function getSort(): string
    {
        return $this->input('sort', 'id');
    }
}
