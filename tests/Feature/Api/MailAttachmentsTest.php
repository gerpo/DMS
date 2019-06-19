<?php

namespace Tests\Feature\Api;

use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MailAttachmentsTest extends TestCase
{
    /** @test */
    public function file_is_required(): void
    {
        $this->withExceptionHandling()->signIn(create(User::class), 'send_mails');

        $this->post(route('api.mailAttachments'), ['file' => null])
            ->assertSessionHasErrors(['file']);
    }

    /** @test */
    public function an_unauthenticated_user_cannot_upload_any_files(): void
    {
        $this->withExceptionHandling()->signIn();

        $uploadedFile = UploadedFile::fake()->create('test.pdf');

        $this->post(route('api.mailAttachments'), ['file' => $uploadedFile])
            ->assertStatus(403);
    }

    /** @test */
    public function an_authenticated_user_can_upload_file(): void
    {
        $this->signIn($user = create(User::class), 'send_mails');

        $uploadedFile = UploadedFile::fake()->create('test.pdf');

        $this->post(route('api.mailAttachments'), ['file' => $uploadedFile])
            ->assertSuccessful();
    }

    /** @test */
    public function an_admin_can_upload_file(): void
    {
        $this->signInAdmin();

        $uploadedFile = UploadedFile::fake()->create('test.pdf');

        $this->post(route('api.mailAttachments'), ['file' => $uploadedFile])
            ->assertSuccessful();
    }

    /** @test */
    public function returns_valid_storage_path(): void
    {
        $this->signInAdmin();

        $uploadedFile = UploadedFile::fake()->create('test.pdf');

        $response = $this->post(route('api.mailAttachments'), ['file' => $uploadedFile])
            ->assertSuccessful();

        Storage::assertExists($response->getContent());
    }


    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake();
    }
}
