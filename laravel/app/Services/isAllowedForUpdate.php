<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class isAllowedForUpdate
{
    public static function task(string $task_id): bool
    {
        $task = Task::where('id', $task_id)->with('project')->firstOrFail();
        if (isStatusHigherThan::executor(
                $task->project->id
            ) || $task->executor_id === null || $task->executor_id == Auth::id()) {
            return true;
        } else {
            return false;
        }
    }
}
