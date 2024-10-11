<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use jcobhams\NewsApi\NewsApi;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

use App\Models\{
    News,
    Category,
    Source
};

class FetchFromNewsApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:news-api';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will fetch data from news api';

    /**
     * News Source
     * 
     * @var array
     */
    private $sources = null;


    /**
     * News api base URL
     * 
     * @var string
     */
    private $baseUrl = 'https://newsapi.org/v2';

    
    /**
     * Find source in list of sources
     * @param string $sourceId
     */
    private function findSource($sourceId) {
        foreach ($this->sources as $source) {
            if ($source['id'] === $sourceId) {
                return $source;
            }
        }
        return null;
    }


    /**
     * remove special and unsupported characters fron string
     * @param string $input
     * @return string
     */
    private function cleanString($input) {
        return trim(preg_replace('/[^a-zA-Z0-9\s]/', '', $input));
    }


    /**
     * Execute the console command.
     */
    public function handle()
    {

        try {

            $newsApiService = new NewsApi(config('services.news_api.key'));
            /**
             * Check if Catogry already added or not
             */
            if (!Category::first()) {
            $categories = $newsApiService->getCategories();
            $newsCategories = [];
            foreach ($categories as $category) {
                    $newsCategories[] = [
                        'name' => $category
                    ];
            }
            Category::insert($newsCategories); 
            }


            /**
             * Get all news sources
            */
            $response = Http::get($this->baseUrl."/sources", [
                'apiKey' => config('services.news_api.key')
            ]);
            if ($response->successful()) {
                $sources = $response->json();
                if (isset($sources['sources'])) {
                    $this->sources = $sources['sources'];

                    // Add sources if not added already
                    if (!Source::first()) {
                        $listSources = [];
                        foreach ($sources['sources'] as $source) {
                            $listSources[] = [
                                'name' => $source['name'],
                                'description' => $this->cleanString($source['description']),
                                'url' => $source['url'] ?? null
                            ];
                        }
                        if (count($listSources))
                            Source::insert($listSources);

                    }
                }
            }

            /**
             * Search query
             */
            $query = '';

            /**
             * From and to date filter, for now we are only getting today news
             */

            $from = $to = Carbon::now()->format('Y-m-d');
            $language = 'en';
            $pageSize = 100;
            $page = 1;
            
            /**
             * Sort by
             * sort by options relevancy,popularity,publishedAt
             */
            $sortBy = "popularity";
            /**
             * Domains
             * A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com)
             */
            $domains = 'techcrunch.com,thenextweb.com,bbc.co.uk,engadget.com';
            $listNews = $newsApiService->getEverything($query, '', $domains, '', $from, $to, $language, $sortBy,  $pageSize, $page);
            if ($listNews->status == 'ok') {
                $data = [];
                foreach ($listNews->articles as $news) {
                    if ($news->source->name == '[Removed]' || $news->title == '[Removed]')
                        continue;
                    $sourceId = $news->source->id;
                    $source = $this->findSource($sourceId);
                    $categoryId = null;
                    $sourceId = null;
                    if ($source) {
                        $category = Category::where('name', $source['category'])->first();
                        if ($category)
                            $categoryId = $category->id;

                        $articleSource = Source::where('name', $source['name'])->first();
                        if ($articleSource)
                            $sourceId = $articleSource->id;    
                    }
                    $data[] = [
                        'author' => $news->author,
                        'title' => $news->title,
                        'source' => $news->source->name,
                        'source_id' => $sourceId,
                        'description' => $this->cleanString($news->description),
                        'url' => $news->url,
                        'url_to_image' => $news->urlToImage,
                        'published_at' => Carbon::parse($news->publishedAt)->format('Y-m-d H:i:s'),
                        'content' => $news->content,
                        'category_id' => $categoryId
                    ];
                }

                if (count($data)) {
                    News::insert($data);
                    $this->info('News Api import was successfull!');
                } else {
                    $this->info('No News for today!');
                }
            }

        } catch (Throwable $e) {
            $this->error('The News Api import error '.$e->getMessage());
            \Log::error('News Api Error '.$e->getMessage());
        }
    }
}
