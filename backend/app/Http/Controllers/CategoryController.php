<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\{
    Category
};

class CategoryController extends Controller
{
    /**
     * List categories
     */
    public function index() {
        return $this->respond([
            'categories' => Category::get()
        ]);
    }
}
