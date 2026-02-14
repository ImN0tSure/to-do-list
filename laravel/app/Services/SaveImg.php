<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

class SaveImg
{
    public static string $path = '/img/avatars/';
    public static string $prefix = 'avatar_';
    public static function userAvatar(UploadedFile $file): string {
        $file_name = static::$prefix . time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path(static::$path), $file_name);

        return static::$path . $file_name;
    }
}
