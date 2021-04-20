<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Mentions\Formatter;

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
                $attributes['displayname'] = $this->translator->trans('flarum-mentions.forum.post_mention.deleted_text');
            }

            if ($post && ! $post->user) {
                $attributes['displayname'] = $this->translator->trans('core.lib.username.deleted_text');
            }

            if (strpos($attributes['displayname'], '"#') !== false) {
                $attributes['displayname'] = preg_replace('/"#[a-z]{0,3}[0-9]+/', '_', $attributes['displayname']);
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
            '/<'.preg_quote($tagName).'\b[^>]*(?=\bdisplayname="(.*)")[^>]*(?=\bid="([0-9]+)")[^>]*>@[^<]+<\/'.preg_quote($tagName).'>/U',
            '@"$1"#p$2',
            $xml
        );
    }
}
