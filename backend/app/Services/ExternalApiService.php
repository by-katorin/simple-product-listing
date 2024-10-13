<?php

namespace App\Services;

use GuzzleHttp\Client;

class ExternalApiService
{ 
    protected $client;

    public function __construct()
    {
        $this->client = new  Client();
    }

    public function fetchProducts($page = 1, $perPage = 10)
    {
        $response = $this->client->get('https://dummyjson.com/products', [
            'query' => [
                'page' => $page,
                'per_page' => $perPage,
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}