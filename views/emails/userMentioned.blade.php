{!! $translator->trans('flarum-mentions.email.user_mentioned.body', [
'{recipient_username}' => $user->display_name,
'{mentioner_username}' => $blueprint->post->user->display_name,
'{title}' => $blueprint->post->discussion->title,
'{url}' => $url->to('forum')->route('discussion', ['id' => $blueprint->post->discussion_id]),
'{reply_number}' => $blueprint->post->number,
'{content}' => $blueprint->post->content
]) !!}
