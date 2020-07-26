<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $prefix = $schema->getConnection()->getTablePrefix();
        $schema->getConnection()->statement("INSERT INTO `${prefix}post_mentions` (`post_id`, `mentions_post_id`, `mentions_user_id`)
            SELECT `post_id`, `mentions_post_id`, `user_id` FROM `${prefix}post_mentions_post`
            LEFT JOIN `${prefix}posts`
            ON `${prefix}posts`.`id`=`${prefix}post_mentions_post`.`mentions_post_id`
            UNION ALL
            SELECT `post_id`, NULL AS `mentions_post_id`, `mentions_user_id` FROM `${prefix}post_mentions_user`;");
    },

    'down' => function (Builder $schema) {
        $prefix = $schema->getConnection()->getTablePrefix();
        $schema->getConnection()->statement("INSERT INTO `${prefix}post_mentions_post` (`post_id`, `mentions_post_id`)
            SELECT DISTINCT `post_id`, `mentions_post_id` FROM `${prefix}post_mentions`
            WHERE `mentions_post_id` IS NOT NULL;");

        $schema->getConnection()->statement("INSERT INTO `${prefix}post_mentions_user` (`post_id`, `mentions_user_id`)
            SELECT DISTINCT `post_id`, `mentions_user_id` FROM `${prefix}post_mentions`
            WHERE `mentions_user_id` IS NOT NULL;");
    }
];
