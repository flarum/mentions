import Component from 'flarum/Component';

import reply from 'flarum/mentions/utils/reply';

export default class PostQuoteButton extends Component {
  init() {
    this.post = this.props.post;
    $(document).on('mouseup', this.hide.bind(this));
  }

  view() {
    const text = app.translator.trans('flarum-mentions.forum.post.quote_button');
    return (
      <ul className="Dropdown-menu PostQuoteButton fade">
        <li><button onclick={() => reply(this.post, this.props.quote)}>{text}</button></li>
      </ul>
    );
  }

  show(left, top) {
    const $this = this.$();

    // Show button middle of clicked position.
    const offset = $this.outerHeight() + 25;

    // If the button goes off the top of the viewport, reposition
    // it to be below the line.
    if (top - offset < $(window).scrollTop() + $('#header').outerHeight()) {
      top -= 10;
    } else {
      top -= offset;
    }

    left -= $this.outerWidth() / 2;
    $this.show()
      .css('top', top)
      .css('left', left);
    setTimeout(() => $this.off('transitionend').addClass('in'), 150);
  }

  hide() {
    const $this = this.$();
    if ($this.hasClass('in')) {
      $this.removeClass('in').one('transitionend', () => $this.hide());
    }
  }
}
