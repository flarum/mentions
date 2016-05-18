import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';

import PostQuoteButton from 'flarum/mentions/components/PostQuoteButton';

export default function addPostQuoteButton() {
  extend(CommentPost.prototype, 'config', function(original, isInitialized) {
    const post = this.props.post;

    if (isInitialized || post.isHidden() || (app.session.user && !post.discussion().canReply())) return;

    let windowsSelection;
    const $postBody = this.$().find('.Post-body');
    // Wrap the quote button in a wrapper element so that we can render
    // button into it.
    const $container = $('<div class="PostBody-postQuoteButtonContainer"></div>');
    const postQuoteButton = new PostQuoteButton({post});

    $postBody.after($container);

    m.render($container[0], postQuoteButton.render());

    // Get selection parrent to making sure user only selected post contents.
    const getSelectionParentElement = function() {
      if (windowsSelection.rangeCount) {
          const parent = windowsSelection.getRangeAt(0).commonAncestorContainer;
          if (parent.nodeType != 1) {
              return parent.parentNode;
          }
          return parent;
      }
    }

    this.$()
      .after($container)
      .on('mouseup', function(e) {
        setTimeout(function() {
          windowsSelection = window.getSelection();
          if ($.contains($postBody[0], getSelectionParentElement())) {
            const quote = $.trim(windowsSelection.toString());
            if (quote) {
              postQuoteButton.props.quote = quote;
              postQuoteButton.show(e.pageX, e.pageY);
            }
          }
        }, 100);
      });
  });
}
