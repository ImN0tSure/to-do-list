<?php

namespace App\Services\Tasklist;

use App\Models\Tasklist;

class UpdateTasklistService
{
    public function execute(array $data, string $tasklist_id): bool
    {
        unset ($data['oldName']);

        $tasklist = Tasklist::findOrFail($tasklist_id);

        return $tasklist->update($data);
    }
}
