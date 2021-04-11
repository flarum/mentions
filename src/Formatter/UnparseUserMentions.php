<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Mentions\Formatter;

use Flarum\Http\SlugManager;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface as Request;
use s9e\TextFormatter\Parser;
use s9e\TextFormatter\Renderer;
use s9e\TextFormatter\Utils;

class UnparseUserMentions
{
    /**
     * @var SlugManager
     */
    private $slugManager;

    public function __construct(SlugManager $slugManager)
    {
        $this->slugManager = $slugManager;
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
        $xml = $this->updateUserMentionTags($context, $xml);
        $xml = $this->removeUserMentionTags($xml);

        return $xml;
    }

    protected function updateUserMentionTags($context, string $xml)
    {
        $post = $context;

        return Utils::replaceAttributes($xml, 'USERMENTION', function ($attributes) use ($post) {
            $user = $post->mentionsUsers->find($attributes['id']);

            if ($user) {
                $attributes['slug'] = $this->slugManager->forResource(User::class)->toSlug($user);
                $attributes['displayname'] = $user->display_name;
            }

            return $attributes;
        });
    }

    protected function removeUserMentionTags(string $xml)
    {
        $tagName = 'USERMENTION';

        if (strpos($xml, $tagName) === false) {
            return $xml;
        }

        return preg_replace(
            '/<' . preg_quote($tagName) . '\b[^>]*(?=\bdisplayname="(.*)")[^>]*(?=\bid="([0-9]+)")[^>]*>@[^<]+<\/' . preg_quote($tagName) . '>/U',
            '@"$1"#$2',
            $xml
        );
    }
}
