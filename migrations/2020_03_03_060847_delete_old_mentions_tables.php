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

                $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
                $table->foreign('mentions_post_id')->references('id')->on('posts')->onDelete('cascade');
            }
        );

        $schema->create(
            'post_mentions_user',
            function (Blueprint $table) {
                $table->integer('post_id')->unsigned();
                $table->integer('mentions_user_id')->unsigned();
                $table->primary(['post_id', 'mentions_user_id']);

                $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
                $table->foreign('mentions_user_id')->references('id')->on('users')->onDelete('cascade');
            }
        );
    }
];
