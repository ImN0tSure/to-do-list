<?php

namespace App\Services\Tasklist;

use App\Models\Tasklist;

class CreateTasklistService
{
    public function execute(array $data, string $project_id): Tasklist
    {
        $data['project_id'] = $project_id;

        return Tasklist::create($data);
    }
}
