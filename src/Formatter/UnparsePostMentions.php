<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Mentions\Formatter;

use Flarum\Post\CommentPost;
use Psr\Http\Message\ServerRequestInterface as Request;
use s9e\TextFormatter\Utils;
use Symfony\Contracts\Translation\TranslatorInterface;

class UnparsePostMentions
{
    /**
     * @var TranslatorInterface
     */
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * Configure rendering for user mentions.
     *
     * @param string $xml
     * @param mixed $context
     * @return string $xml to be unparsed
     */
    public function __invoke($context, string $xml)
    {
        $xml = $this->updatePostMentionTags($context, $xml);
        $xml = $this->removePostMentionTags($xml);

        return $xml;
    }

    protected function updatePostMentionTags($context, string $xml)
    {
        $post = $context;

        return Utils::replaceAttributes($xml, 'POSTMENTION', function ($attributes) use ($post) {
            $post = $post->mentionsPosts->find($attributes['id']);
            if ($post && $post->user) {
                $attributes['displayname'] = $post->user->display_name;
            }

            if (! $post) {
                $attributes['displayname'] = $this->translator->trans('flarum-mentions.forum.post_mention.unknown_text');
            }

            if ($post && ! $post->user) {
                $attributes['displayname'] = $this->translator->trans('core.lib.username.deleted_text');
            }

            return $attributes;
        });
    }

    protected function removePostMentionTags(string $xml)
    {
        $tagName = 'POSTMENTION';

        if (strpos($xml, $tagName) === false) {
            return $xml;
        }

        return preg_replace(
            '/<' . preg_quote($tagName) . '\b[^>]*(?=\bdisplayname="(.*)")[^>]*(?=\bid="([0-9]+)")[^>]*>@[^<]+<\/' . preg_quote($tagName) . '>/U',
            '@"$1"#p$2',
            $xml
        );
    }
}
