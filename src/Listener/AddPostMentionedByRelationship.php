<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Mentions\Listener;

use Flarum\Api\Controller;
use Flarum\Api\Event\WillGetData;
use Illuminate\Contracts\Events\Dispatcher;

class AddPostMentionedByRelationship
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(WillGetData::class, [$this, 'includeRelationships']);
    }

    /**
     * @param WillGetData $event
     */
    public function includeRelationships(WillGetData $event)
    {
        if ($event->isController(Controller\ShowDiscussionController::class)) {
            $event->addInclude([
                'posts.mentionedBy',
                'posts.mentionedBy.user',
                'posts.mentionedBy.discussion'
            ]);
        }

        if ($event->isController(Controller\ShowPostController::class)
            || $event->isController(Controller\ListPostsController::class)) {
            $event->addInclude([
                'mentionedBy',
                'mentionedBy.user',
                'mentionedBy.discussion'
            ]);
        }

        if ($event->isController(Controller\CreatePostController::class)) {
            $event->addInclude([
                'mentionsPosts',
                'mentionsPosts.mentionedBy'
            ]);
        }
    }
}
