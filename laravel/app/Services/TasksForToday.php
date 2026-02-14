<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

class TasksForToday
{
    public static function getList(string $user_id): Collection
    {
        return Task::where('executor_id', $user_id)->with(['project:url'])->get();
    }
}
