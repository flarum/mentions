import addComposerAutocomplete from './addComposerAutocomplete';
import addMentionedByList from './addMentionedByList';
import addPostMentionPreviews from './addPostMentionPreviews';
import addPostQuoteButton from './addPostQuoteButton';
import addPostReplyAction from './addPostReplyAction';
import MentionsUserPage from './components/MentionsUserPage';
import PostMentionedNotification from './components/PostMentionedNotification';
import UserMentionedNotification from './components/UserMentionedNotification';
import AutocompleteDropdown from './fragments/AutocompleteDropdown';
import PostQuoteButton from './fragments/PostQuoteButton';
import getCleanDisplayName from './utils/getCleanDisplayName';
import getMentionText from './utils/getMentionText';
import reply from './utils/reply';
import selectedText from './utils/selectedText';
import * as textFormatter from './utils/textFormatter';

export default {
  'mentions/addComposerAutocomplete': addComposerAutocomplete,
  'mentions/addMentionedByList': addMentionedByList,
  'mentions/addPostMentionPreviews': addPostMentionPreviews,
  'mentions/addPostQuoteButton': addPostQuoteButton,
  'mentions/addPostReplyAction': addPostReplyAction,
  'mentions/components/MentionsUserPage': MentionsUserPage,
  'mentions/components/PostMentionedNotification': PostMentionedNotification,
  'mentions/components/UserMentionedNotification': UserMentionedNotification,
  'mentions/fragments/AutocompleteDropdown': AutocompleteDropdown,
  'mentions/fragments/PostQuoteButton': PostQuoteButton,
  'mentions/utils/getCleanDisplayName': getCleanDisplayName,
  'mentions/utils/getMentionText': getMentionText,
  'mentions/utils/reply': reply,
  'mentions/utils/selectedText': selectedText,
  'mentions/utils/textFormatter': textFormatter
};