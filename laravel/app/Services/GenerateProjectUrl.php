<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Str;

class GenerateProjectUrl
{
    public static function generate():string {
        do {
            $new_url = Str::random(10);
            sleep(1 / 5);
        } while (Project::where('url', $new_url)->first() != null);

        return $new_url;
    }
}
