<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MailAttachmentsController extends Controller
{
    public function store(Request $request)
    {
        $file = $request->validate([
            'file' => 'required|file'
        ]);

        return \Storage::putFile('attachments', $file);
    }
}
