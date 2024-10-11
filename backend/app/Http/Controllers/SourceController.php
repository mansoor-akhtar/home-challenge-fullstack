<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\{
    Source
};

class SourceController extends Controller
{
    /**
     * List categories
     */
    public function index() {
        return $this->respond([
            'sources' => Source::select('id', 'name')->get()
        ]);
    }
}
