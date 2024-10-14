<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::command('fetch:news-api')->daily();
Schedule::command('fetch:new-york-times-api')->daily();
Schedule::command('fetch:the-guardian-api')->daily();
