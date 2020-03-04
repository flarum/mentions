<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;


return [
    'up' => function (Builder $schema) {
        // Create new table
        $schema->create('post_mentions', function (Blueprint $table) {
            $table->integer('post_id')->unsigned();
            $table->integer('mentions_post_id')->unsigned()->nullable();
            $table->integer('mentions_user_id')->unsigned()->nullable();
            $table->primary(['post_id']);
        });

        // Establish foreignkey constraints
        $schema->table('post_mentions', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('mentions_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('mentions_post_id')->references('id')->on('posts')->onDelete('cascade');
        });

        // Move stuff from post mentions table
        $postMentions = $schema->getConnection()->table('post_mentions_post')->cursor();

        foreach($postMentions as $postMention) {
            $schema
                ->getConnection()->table('post_mentions')
                ->insert([
                    'post_id' => $postMention->post_id,
                    'mentions_post_id' => $postMention->mentions_post_id,
                    'mentions_user_id' => null
                ]);
        }

        // Move stuff from user mentions table
        $userMentions = $schema->getConnection()->table('post_mentions_user')->cursor();

        foreach ($userMentions as $userMention) {
            $schema
                ->getConnection()->table('post_mentions')
                ->insert([
                    'post_id' => $userMention->post_id,
                    'mentions_post_id' => null,
                    'mentions_user_id' => $userMention->mentions_user_id
                ]);
        }

        // Drop old tables
        $schema->dropIfExists('post_mentions_post');
        $schema->dropIfExists('post_mentions_user');
    },

    'down' => function (Builder $schema) {
        // Recreate old tables
        $schema->create('post_mentions_users',
            function (Blueprint $table) {
                $table->integer('post_id')->unsigned();
                $table->integer('mentions_post_id')->unsigned();
                $table->primary(['post_id', 'mentions_post_id']);
        });

        $schema->create('post_mentions_post',
            function (Blueprint $table) {
                $table->integer('post_id')->unsigned();
                $table->integer('mentions_post_id')->unsigned();
                $table->primary(['post_id', 'mentions_post_id']);
        });

        // Recreate old foreign keys
        $schema->table('post_mentions_post', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('mentions_post_id')->references('id')->on('posts')->onDelete('cascade');
        });

        $schema->table('post_mentions_user', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('mentions_user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Move stuff from new table to old table
        $mentions = $schema->getConnection()->table('post_mentions')->cursor();

        foreach ($mentions as $mention) {
            if ($mention->mentions_user_id) {
                $schema
                    ->getConnection()->table('post_mentions_user')
                    ->insert([
                        'post_id' => $mention->post_id,
                        'mentions_user_id' => $mention->mentions_user_id
                    ]);
            } else if ($mention->mentions_post_id) {
                $schema
                    ->getConnection()->table('post_mentions_post')
                    ->insert([
                        'post_id' => $mention->post_id,
                        'mentions_post_id' => $mention->mentions_post_id
                    ]);
            }
        }

        // Drop new table
        $schema->dropIfExists('post_mentions');
    }
];
