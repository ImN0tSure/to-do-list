<?php
return [
    'creator' => [
        'project.participant.all',
        'project.participant.get',
        'project.participant.invite',
        'project.participant.exclude',

        'tasklist.all',
        'tasklist.create',
        'tasklist.update',
        'tasklist.delete',

        'task.all',
        'task.create',
        'task.update',
        'task.delete',
    ],
    'curator' => [
        'project.participant.all',
        'project.participant.get',
        'project.participant.invite',
        'project.participant.exclude',
        'project.participant.quit',

        'tasklist.all',
        'tasklist.create',
        'tasklist.update',
        'tasklist.delete',

        'task.all',
        'task.create',
        'task.update',
        'task.delete',
    ],
    'executor' => [
        'project.participant.all',
        'project.participant.get',
        'project.participant.quit',

        'tasklist.all',

        'task.all',
        'task.update.tasklist',
        'task.update.status',
        'task.update.executor.self',
    ]
];
