<?php

namespace App\Services\Permissions;

use App\Models\ProjectParticipant;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProjectPermissionResolver
{
    private string $config_file_name = 'project_permissions';
    private string $highest_role = 'creator';
    public function check(User $user, string $permission, $project_id): bool
    {
        $project_participant = ProjectParticipant::where([
            'project_id' => $project_id,
            'user_id' => Auth::id(),
        ])->first();

        $role = $project_participant->role;

        $permissions = config($this->config_file_name);

        if ($role === $this->highest_role) {
            return true;
        } elseif (in_array($permission, $permissions[$role])) {
            return true;
        } else {
            return false;
        }
    }
}
