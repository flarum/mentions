import Fragment from 'flarum/Fragment';
import icon from 'flarum/helpers/icon';

import reply from '../utils/reply';

export default class PostQuoteButton extends Fragment {
  constructor(post) {
    super();

    this.post = post;
  }

  view() {
    return (
      <button class="Button PostQuoteButton" onclick={() => {
        this.hide();
        reply(this.post, this.content);
      }} mousedown={(e) => e.stopPropagation()}>
        {icon('fas fa-quote-left', { className: 'Button-icon' })}
        {app.translator.trans('flarum-mentions.forum.post.quote_button')}
      </button>
    );
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.hideHandler = this.hide.bind(this);
    $(document).on('mousedown', this.hideHandler);
  }

  onremove(vnode) {
    $(document).off('mousedown', this.hideHandler);
  }

  show(left, top) {
    const $this = this.$().show();
    const parentOffset = $this.offsetParent().offset();

    $this
      .css('left', left - parentOffset.left)
      .css('top', top - parentOffset.top);
  }

  showStart(left, top) {
    const $this = this.$();

    this.show(left, $(window).scrollTop() + top - $this.outerHeight() - 5);
  }

  showEnd(right, bottom) {
    const $this = this.$();

    this.show(right - $this.outerWidth(), $(window).scrollTop() + bottom + 5);
  }

  hide() {
    this.$().hide();
  }
}
