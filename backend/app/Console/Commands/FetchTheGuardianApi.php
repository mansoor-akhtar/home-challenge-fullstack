<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

use App\Models\{
    News
};

class FetchTheGuardianApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:the-guardian-api';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will fetch data from the  guardian';


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
                'api-key' => config('services.the_guardian.key'),
                'from-date' => Carbon::now()->format('Y-m-d'),
                'to-date' => Carbon::now()->format('Y-m-d'),
                'show-fields' => "all",
                'order-by' => 'newest'
            ];
            $response = Http::get(config('services.the_guardian.url').'?'.http_build_query($params));

            $data = null;
            if ($response->successful()) {
                $data = $response->json();
            }

            $news = [];
            if ($data && isset($data['response']['results'])) {
                foreach ($data['response']['results'] as $article) {
                    $urlToImage = null;
                    if (isset($article['multimedia']) && !emptry($article['multimedia'])) {
                        foreach ($article['multimedia'] as $media) {
                            if ($media['type'] === 'image' && !empty($media['url'])) {
                                $urlToImage = config('services.nytimes_api.assets_url').$media['url'];
                                break;
                            }
                        }
                    }
                    
                    $news[] = [
                        'title' => $article['webTitle'] ?? '',
                        'source' => $article['publication'] ?? '',
                        'description' => isset($article['fields']['bodyText']) ? $this->cleanString(substr($article['fields']['bodyText'], 0, 500))  : '',
                        'url' => $article['webUrl'] ?? '',
                        'url_to_image' => $article['fields']['thumbnail'] ?? null,
                        'published_at' => isset($article['fields']['firstPublicationDate']) ? Carbon::parse($article['fields']['firstPublicationDate'])->format('Y-m-d H:i:s') : null,
                        'content' => isset($article['fields']['bodyText']) ? $this->cleanString(substr($article['fields']['bodyText'], 0, 1000))  : ''
                    ];
                    
                }
            }

            if (count($news)) {
                News::insert($news);
                $this->info('The Guardian import was successfull!');
            } else {
                $this->info('No News for today!');
            }

        } catch (Throwable $e) {
            $this->error('The Guardian import error '.$e->getMessage());
            \Log::error('Fetch the Guardian Api Error '.$e->getMessage());
        }
    }
}
