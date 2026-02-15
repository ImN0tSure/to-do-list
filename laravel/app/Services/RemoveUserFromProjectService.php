<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class RemoveUserFromProjectService
{
    public function remove(Project $project, int $user_id): void
    {
        DB::transaction(function () use ($project, $user_id) {
            $tasks = $project->tasks()->where('executor_id', $user_id);

            Notification::whereIn('notifiable_id', $tasks->pluck('tasks.id'))
                ->where('notifiable_type', 'task_deadline')
                ->whereNull('deleted_at')
                ->update(['deleted_at' => now()]);

            $tasks->update(['executor_id' => null]);

            $project->participantRecords()->where('user_id', $user_id)->delete();
        });
    }
}
