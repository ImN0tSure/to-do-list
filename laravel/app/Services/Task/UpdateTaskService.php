<?php

namespace App\Services\Task;

use App\Models\Task;

class UpdateTaskService
{
    public function execute(array $data, string $task_id): bool
    {
        $task = Task::findOrFail($task_id);
        return $task->update($data);
    }
}
