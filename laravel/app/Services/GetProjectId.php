<?php

namespace App\Services;

use App\Models\Project;

class GetProjectId
{
    public static function byUrl(string $project_url): string
    {
        $project = Project::where('url', '=', $project_url)->firstOrFail();

        return $project->id;
    }
}
