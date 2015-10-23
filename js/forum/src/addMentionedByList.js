import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import Post from 'flarum/models/Post';
import CommentPost from 'flarum/components/CommentPost';
import PostPreview from 'flarum/components/PostPreview';
import punctuateSeries from 'flarum/helpers/punctuateSeries';
import username from 'flarum/helpers/username';
import icon from 'flarum/helpers/icon';

export default function addMentionedByList() {
  Post.prototype.mentionedBy = Model.hasMany('mentionedBy');

  extend(CommentPost.prototype, 'footerItems', function(items) {
    const post = this.props.post;
    const replies = post.mentionedBy();

    if (replies && replies.length) {
      // If there is only one reply, and it's adjacent to this post, we don't
      // really need to show the list.
      if (replies.length === 1 && replies[0].number() === post.number() + 1) {
        return;
      }

      const hidePreview = () => {
        this.$('.Post-mentionedBy-preview')
          .removeClass('in')
          .one('transitionend', function() { $(this).hide(); });
      };

      const config = function(element, isInitialized) {
        if (isInitialized) return;

        const $this = $(element);
        let timeout;

        const $preview = $('<ul class="Dropdown-menu Post-mentionedBy-preview fade"/>');
        $this.append($preview);

        $this.children().hover(function() {
          clearTimeout(timeout);
          timeout = setTimeout(function() {
            if (!$preview.hasClass('in') && $preview.is(':visible')) return;

            // When the user hovers their mouse over the list of people who have
            // replied to the post, render a list of reply previews into a
            // popup.
            m.render($preview[0], replies.map(reply => (
              <li data-number={reply.number()}>
                {PostPreview.component({
                  post: reply,
                  onclick: hidePreview
                })}
              </li>
            )));
            $preview.show();
            setTimeout(() => $preview.off('transitionend').addClass('in'));
          }, 500);
        }, function() {
          clearTimeout(timeout);
          timeout = setTimeout(hidePreview, 250);
        });

        // Whenever the user hovers their mouse over a particular name in the
        // list of repliers, highlight the corresponding post in the preview
        // popup.
        $this.find('.Post-mentionedBy-summary a').hover(function() {
          $preview.find('[data-number="' + $(this).data('number') + '"]').addClass('active');
        }, function() {
          $preview.find('[data-number]').removeClass('active');
        });
      };

// NEEDS TO BE FIXED: The next two blocks of code. See https://github.com/flarum/core/issues/597 for details.

      // Create a list of unique users who have replied. So even if a user has
      // replied twice, they will only be in this array once.
      const used = [];
      const repliers = replies.filter(reply => {
        const user = reply.user();
        const id = user && user.id();
        if (used.indexOf(id) === -1) {
          used.push(id);
          return true;
        }
      });

      const names = repliers.sort(a => a === app.session.user ? -1 : 1)
        .map(reply => {
          const user = reply.user();

          return (
            <a href={app.route.post(reply)}
              config={m.route}
              onclick={hidePreview}
              data-number={reply.number()}>
              {app.session.user === user ? app.translator.trans('flarum-mentions.forum.post.you_text') : username(user)}
            </a>
          );
        });

      items.add('replies',
        <div className="Post-mentionedBy" config={config}>
          <span className="Post-mentionedBy-summary">
            {icon('reply')}
            // PLEASE CHECK: Using the syntax from "addLikesList.js" with "repliers[0]" in place of "likes[0]".
            {app.translator.transChoice('flarum-mentions.forum.post.mentioned_by' + (repliers[0] === app.session.user ? '_self' : '') + '_text', names.length, {
              count: names.length,
              users: punctuateSeries(names)
            })}
          </span>
        </div>
      );
    }
  });
}
