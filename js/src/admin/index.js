import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('mention', () => {
  extend(PermissionGrid.prototype, 'replyItems', items => {
    items.add('mention.users', {
      icon: 'fas fa-at',
      label: app.translator.trans('flarum-mentions.admin.permissions.mention_users_discussions_label'),
      permission: 'discussion.mention.users'
    }, 95);
  });
  extend(PermissionGrid.prototype, 'replyItems', items => {
    items.add('mention.posts', {
      icon: 'fas fa-at',
      label: app.translator.trans('flarum-mentions.admin.permissions.mention_posts_discussions_label'),
      permission: 'discussion.mention.posts'
    }, 95);
  });
});
