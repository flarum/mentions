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
use s9e\TextFormatter\Renderer;
use s9e\TextFormatter\Utils;
use Symfony\Contracts\Translation\TranslatorInterface;

class FormatUserMentions
{
    /**
     * @var SlugManager
     */
    private $slugManager;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    public function __construct(SlugManager $slugManager, TranslatorInterface $translator)
    {
        $this->slugManager = $slugManager;
        $this->translator = $translator;
    }

    /**
     * Configure rendering for user mentions.
     *
     * @param s9e\TextFormatter\Renderer $renderer
     * @param mixed $context
     * @param string|null $xml
     * @return string $xml to be rendered
     */
    public function __invoke(Renderer $renderer, $context, string $xml)
    {
        $post = $context;

        return Utils::replaceAttributes($xml, 'USERMENTION', function ($attributes) use ($post) {
            $user = $post->mentionsUsers->find($attributes['id']);

            if ($user) {
                $attributes['slug'] = $this->slugManager->forResource(User::class)->toSlug($user);
                $attributes['displayname'] = $user->display_name;
            } else {
                $attributes['slug'] = '';
                $attributes['displayname'] = $this->translator->trans('core.lib.username.deleted_text');
            }

            return $attributes;
        });
    }
}
