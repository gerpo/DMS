<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Storage;

class MailAttachmentsController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'file' => 'required|file'
        ]);

        return Storage::putFile('attachments', $data['file']);
    }

    public function destroy(Request $request)
    {
        $data = $request->validate([
            'paths' => 'required|array',
            'paths.*' => 'string'
        ]);

        foreach ($data['paths'] as $path) {
            Storage::delete($path);
        }
    }
}
