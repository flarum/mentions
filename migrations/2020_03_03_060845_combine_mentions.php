<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        // Create new table
        $schema->create('post_mentions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_id')->unsigned();
            $table->integer('mentions_post_id')->unsigned()->nullable();
            $table->integer('mentions_user_id')->unsigned()->nullable();
        });

        // Establish foreignkey constraints
        $schema->table('post_mentions', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('mentions_post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('mentions_user_id')->references('id')->on('users')->onDelete('cascade');
        });

        $prefix = $schema->getConnection()->getTablePrefix();
        $schema->getConnection()->statement("INSERT INTO `${prefix}post_mentions` (`post_id`, `mentions_post_id`, `mentions_user_id`)
            SELECT `post_id`, `mentions_post_id`, NULL AS `mentions_user_id` FROM `${prefix}post_mentions_post`
            UNION ALL
            SELECT `post_id`, NULL AS `mentions_post_id`, `mentions_user_id` FROM `${prefix}post_mentions_user`;");

        // Drop old tables
        $schema->dropIfExists('post_mentions_post');
        $schema->dropIfExists('post_mentions_user');
    },

    'down' => function (Builder $schema) {
        // Recreate old tables
        $schema->create(
            'post_mentions_post',
            function (Blueprint $table) {
                $table->integer('post_id')->unsigned();
                $table->integer('mentions_post_id')->unsigned();
                $table->primary(['post_id', 'mentions_post_id']);
            }
        );

        $schema->create(
            'post_mentions_user',
            function (Blueprint $table) {
                $table->integer('post_id')->unsigned();
                $table->integer('mentions_user_id')->unsigned();
                $table->primary(['post_id', 'mentions_user_id']);
            }
        );

        // Recreate old foreign keys
        $schema->table('post_mentions_post', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('mentions_post_id')->references('id')->on('posts')->onDelete('cascade');
        });

        $schema->table('post_mentions_user', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('mentions_user_id')->references('id')->on('users')->onDelete('cascade');
        });

        $prefix = $schema->getConnection()->getTablePrefix();
        $schema->getConnection()->statement("INSERT INTO `${prefix}post_mentions_post` (`post_id`, `mentions_post_id`)
            SELECT `post_id`, `mentions_post_id` FROM `${prefix}post_mentions`
            WHERE `mentions_post_id` IS NOT NULL;");

        $schema->getConnection()->statement("INSERT INTO `${prefix}post_mentions_user` (`post_id`, `mentions_user_id`)
            SELECT `post_id`, `mentions_user_id` FROM `${prefix}post_mentions`
            WHERE `mentions_user_id` IS NOT NULL;");

        // Drop new table
        $schema->dropIfExists('post_mentions');
    }
];
