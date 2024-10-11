<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('news')) {
            Schema::create('news', function (Blueprint $table) {
                $table->id();
                $table->string('author')->nullable();
                $table->text('source')->nullable();
                $table->integer('source_id')->nullable();
                $table->text('title')->nullable();
                $table->text('description')->nullable();
                $table->text('url')->nullable();
                $table->text('url_to_image')->nullable();
                $table->dateTime('published_at')->nullable();
                $table->text('content')->nullable();
                $table->integer('category_id')->nullable();
            });
        }
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
