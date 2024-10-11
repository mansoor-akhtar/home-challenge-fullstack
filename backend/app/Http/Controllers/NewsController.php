<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\{
    News
};

class NewsController extends Controller
{
    /**
     * List of news
     */
    public function index(Request $request, News $news) {

        $news = $news->with('category');
        $isLoggedIn = auth('api')->check();
        $user = $isLoggedIn ? auth('api')->user() : null;
        
        /**
         * Source filter
         */
        if ($request->has('source_id')) {
            $news = $news->Where('source_id', $request->source_id);
        } else if ($isLoggedIn) {
            if (!is_null($user->preferred_source_id) && !empty($user->preferred_source_id))
                $news = $news->orWhere('source_id', $user->preferred_source_id);
        }
            

        /**
         * Category filter
         */
        if ($request->has('category_id')) {
            $news = $news->Where('category_id', $request->category_id);
        } else if ($isLoggedIn) {
            if (!is_null($user->preferred_category_id) && !empty($user->preferred_category_id))
                $news = $news->orWhere('category_id', $user->preferred_category_id);
        }
            
        if ($request->has('search_keyword')) 
            $news = $news->whereRaw("title like '%".$request->search_keyword."%' or description like '%".$request->search_keyword."%'");

        if ($request->has('published_at')) {
            $news = $news->whereDate('published_at', '=', $request->published_at);
        } else {
            // Get only today articles
            $news = $news->whereDate('published_at', '=', Carbon::now()->format('Y-m-d'));
        }
        return $this->respond([
            'news' => $news->get()
        ]);
    }
}