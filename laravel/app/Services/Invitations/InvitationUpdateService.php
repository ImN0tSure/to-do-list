<?php

namespace App\Services\Invitations;

use App\Models\Invitation;
use App\Models\ProjectParticipant;
use App\Services\ProjectParticipant\CreateProjectParticipantService;
use Illuminate\Support\Facades\Auth;

class InvitationUpdateService
{
    private string $reject_response_message = 'отклонил';
    private string $accept_response_message = 'принял';
    private string $default_user_status = '2';
    private string $default_user_role = 'executor';

    public function execute($notifiable_id, $is_accepted)
    {
        $response = $this->reject_response_message;

        if($is_accepted){
            $this->accepted($notifiable_id);
            $response = $this->accept_response_message;
        }

        $invitation = Invitation::find($notifiable_id);
        $invitation->is_accepted = $is_accepted;
        $invitation->save();

        return $response;
    }

    private function accepted($notifiable_id)
    {
        $project_id = Invitation::where('id', $notifiable_id)->first()->project_id;
        $participant_service = new CreateProjectParticipantService();

        $participant_service->execute(
            $project_id,
            Auth::id(),
            CreateProjectParticipantService::$default_user_status,
            CreateProjectParticipantService::$default_user_role
        );
    }

}
