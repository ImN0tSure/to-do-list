<?php

namespace App\Services;

use App\Models\Project;

class CheckParticipant
{
    public static function project(string $project_url, int $user_id): bool
    {
        $project = Project::where('url', $project_url)->firstOrFail();

        return $project->participantRecords()->where('user_id', $user_id)->exists();
    }

}
