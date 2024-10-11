<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;


use App\Models\{
    News,
    Source
};

class FetchFromNYTimesApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:new-york-times-api';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will fetch data from new york times';


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
            $params = [
                'api-key' => config('services.nytimes_api.key'),
                'begin_date' => Carbon::now()->format('Ymd'),
                'end_date' => Carbon::now()->format('Ymd')
            ];
            $response = Http::get(config('services.nytimes_api.url').'articlesearch.json?'.http_build_query($params));
    
            $data = null;
            if ($response->successful()) {
                $data = $response->json();
            }
            
            $news = [];
            if ($data && isset($data['response']['docs'])) {
                foreach ($data['response']['docs'] as $article) {
                    $urlToImage = null;
                    if (isset($article['multimedia']) && is_array($article['multimedia'])) {
                        foreach ($article['multimedia'] as $media) {
                            if ($media['type'] === 'image' && !empty($media['url'])) {
                                $urlToImage = config('services.nytimes_api.assets_url').$media['url'];
                                break;
                            }
                        }
                    }

                    /**
                     * If source not exist then create a source
                     */
                    $sourceId = null;
                    if (!empty($article['source'])) {
                        $articleSource = Source::where('name', $article['source'])->first();
                        if ($articleSource) {
                            $sourceId = $articleSource->id;
                        } else {
                            $source = Source::create([
                                'name' => $article['source']
                            ]);
                            $sourceId = $source->id;
                        }
                            
                    }

                    $news[] = [
                        'title' => $article['snippet'] ?? '',
                        'source' => $article['source'] ?? '',
                        'source_id' => $sourceId,
                        'description' => $this->cleanString($article['lead_paragraph']) ?? '',
                        'url' => $article['web_url'] ?? '',
                        'url_to_image' => $urlToImage,
                        'published_at' => isset($article['pub_date']) ? Carbon::parse($article['pub_date'])->format('Y-m-d H:i:s') : null,
                        'content' => $article['abstract'] ?? ''
                    ];
                }
            }
    
            if (count($news)) {
                News::insert($news);
                $this->info('New York Times import was successfull!');
            } else {
                $this->info('No News for today!');
            }

        } catch (Throwable $e) {
            $this->error('The New York Times API import error '.$e->getMessage());
            \Log::error('New York Times Api Error '.$e->getMessage());
        }
    }
}
