<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Storage;

class MailAttachmentsController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'file' => 'required|file',
        ]);

        $user = $request->user();
        $path = $this->generatePath($user);
        $fileName = $this->generateFileName($path, $data['file']->getClientOriginalName());

        return $data['file']->storeAs($path, $fileName);
    }

    private function generatePath($user): string
    {
        return 'attachments/'.md5($user->id);
    }

    private function generateFileName($path, $originalName): string
    {
        $fullFileName = $originalName;
        $count = 1;
        while (Storage::exists(Str::finish($path, '/').$fullFileName) && $count <= 255) {
            $fileName = pathinfo($originalName, PATHINFO_FILENAME)." ({$count})";
            $extension = pathinfo($originalName, PATHINFO_EXTENSION);

            $fullFileName = $fileName.'.'.$extension;
            $count++;
        }

        return $fullFileName;
    }

    public function destroy(Request $request)
    {
        $data = $request->validate([
            'paths' => 'required|array',
            'paths.*' => 'string',
        ]);

        foreach ($data['paths'] as $path) {
            Storage::delete($path);
        }
    }
}
