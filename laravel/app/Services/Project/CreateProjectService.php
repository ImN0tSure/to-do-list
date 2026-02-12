<?php

namespace App\Services\Project;

use App\Models\Project;
use App\Models\ProjectParticipant;
use App\Services\GenerateProjectUrl;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CreateProjectService
{
    private int $creator_default_status = 1;
    private string $creator_default_role = 'creator';
    public function execute(array $data)
    {
        return DB::transaction(function () use ($data) {
            $data['url'] = GenerateProjectUrl::generate();
            $data['begin_date'] = date('Y-m-d H:i:s');

            $project = Project::create($data);

            $participant = [
                'user_id' => Auth::id(),
                'project_id' => $project->id,
                'status' => $this->creator_default_status,
                'role' => $this->creator_default_role
            ];

            ProjectParticipant::create($participant);
        });

    }
}
