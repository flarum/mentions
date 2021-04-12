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

class UnparsePostMentions
{
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
