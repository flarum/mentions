<x-mail::plain.notification>
<x-slot:body>
{!! $translator->trans('flarum-mentions.email.user_mentioned.plain.body', [
'{mentioner_display_name}' => $blueprint->post->user->display_name,
'{title}' => $blueprint->post->discussion->title,
'{url}' => $url->to('forum')->route('discussion', ['id' => $blueprint->post->discussion_id, 'near' => $blueprint->post->number]),
'{content}' => $blueprint->post->content
]) !!}
</x-slot:body>
</x-mail::plain.notification>
