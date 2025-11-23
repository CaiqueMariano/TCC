<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ExpoService
{
    public static function sendPush(string $expoPushToken, string $title, string $body, array $data = [])
    {
        $payload = [
            'to' => $expoPushToken,
            'title' => $title,
            'body' => $body,
            'sound' => 'default',
            'data' => $data
        ];

        $response = Http::post('https://exp.host/--/api/v2/push/send', $payload);

        if ($response->failed()) {
            Log::error('Erro push Expo', ['resp' => $response->body(), 'token' => $expoPushToken]);
            return false;
        }

        return $response->json();
    }
}
