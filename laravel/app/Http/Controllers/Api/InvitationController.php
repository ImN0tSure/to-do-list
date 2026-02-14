<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateInvitationRequest;
use App\Http\Requests\ResponseInvitationRequest;
use App\Models\Notification;
use App\Services\GetProjectId;
use App\Services\Invitations\InvitationCreateService;
use App\Services\Invitations\InvitationUpdateService;
use Illuminate\Support\Facades\Gate;

class InvitationController extends Controller
{
    private static string $message_success = 'Уведомление с приглашением отправлено пользователю.';
    private static string $message_update_prefix = 'Приглашение ';

    public function create(
        CreateInvitationRequest $request,
        InvitationCreateService $invitation_service
    ): \Illuminate\Http\JsonResponse {
        $project_id = GetProjectId::byUrl($request->project_url);
        Gate::authorize('project.participant.invite', $project_id);

        $invitation_service->execute($request->email, $project_id);

        return response()->json([
            'success' => true,
            'message' => static::$message_success,
        ]);
    }

    public function update(
        ResponseInvitationRequest $request,
        InvitationUpdateService $invitation_service
    ): \Illuminate\Http\JsonResponse {
        $notifiable_id = $request->notifiable_id;
        $is_accepted = (bool)$request->is_accepted;

        $response = $invitation_service->execute($notifiable_id, $is_accepted);

        $this->deleteOriginalInvitationNotification($notifiable_id);

        return response()->json([
            'success' => true,
            'message' => static::$message_update_prefix . $response
        ]);
    }

    protected function deleteOriginalInvitationNotification(string $notifiable_id): void
    {
        Notification::where([
            'notifiable_id' => $notifiable_id,
            'event_type' => 'created'
        ])->update([
            'deleted_at' => now()
        ]);
    }
}
