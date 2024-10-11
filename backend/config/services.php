<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'news_api' => [
        'key' => env('NEWS_API_KEY', '5de1e439b58e4c0896eec3e78728ecc3')
    ],
    'nytimes_api' => [
        'key' => env('NYTIMES_API_KEY', 'drCdMaUYxeJFITmMSolAidL4X1Tertj9'),
        'url' => env('NYTIMES_APP_URL', 'https://api.nytimes.com/svc/search/v2/'),
        'assets_url' => env('NYTIMES_ASSETS_URL', 'https://static01.nyt.com/')
    ],
    'the_guardian' => [
        'key' => env('THE_GUARDIAN_API_KEY', '8aa1cfca-746d-4a30-b0ba-04e6d266e251'),
        'url' => env('THE_GUARDIAN_URL', 'https://content.guardianapis.com/search')
    ]

];
