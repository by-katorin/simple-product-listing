<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Services\ExternalApiService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class ProductController extends Controller implements HasMiddleware
{
    protected $externalApiService;

    public function __construct(ExternalApiService $externalApiService)
    {
        $this->externalApiService = $externalApiService;
    }

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = config('search.results_per_page');

        $data = $this->externalApiService->fetchProducts($page, $perPage);
        $products = $data['products'];

        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'price' => 'required'
        ]);

        $product = $request->user()->products()->create($fields);

        return ['product' => $product, 'user' => $product->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return ['product' => $product, 'user' => $product->user];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        Gate::authorize('modify', $product);

        $fields = $request->validate([
            'title' => 'required|max:255',
            'price' => 'required'
        ]);

        $product->update($fields);

        return ['product' => $product, 'user' => $product->user];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Gate::authorize('modify', $product);

        $product->delete();

        return ['message' => 'Product deleted successfully!'];
    }
}
