<?php

namespace App\Services\ProjectParticipant;

use App\Models\ProjectParticipant;

class CreateProjectParticipantService
{
    public static string $default_user_status = '2';
    public static string $default_user_role = 'executor';
    public function execute(int $project_id, int $participant_id, string $status, string $role): ProjectParticipant
    {
        return ProjectParticipant::create([
            'project_id' => $project_id,
            'user_id' => $participant_id,
            'status' => $status,
            'role' => $role
        ]);
    }
}
