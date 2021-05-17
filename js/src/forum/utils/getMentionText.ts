import type User from 'flarum/common/models/User';
import cleanDisplayName, { ShouldUseOldFormat } from './cleanDisplayName';

/**
 * Fetches the mention text for a specified user (and optionally a post ID for replies).
 *
 * Automatically determines which mention syntax to be used based on the option in the
 * admin dashboard. Also performs display name clean-up automatically.
 *
 * @example <caption>New display name syntax</caption>
 * // '@"User"#1'
 * getMentionText(User) // User is ID 1, display name is 'User'
 *
 * @example <caption>Replying</caption>
 * // '@"User"#p13'
 * getMentionText(User, 13) // User display name is 'User', post ID is 13
 *
 * @example <caption>Using old syntax</caption>
 * // '@username'
 * getMentionText(User) // User's username is 'username'
 */
export default function getMentionText(user: User, postId?: number): string {
  const cleanText = cleanDisplayName(user);

  if (postId === undefined) {
    if (ShouldUseOldFormat()) {
      // Plain @username
      return `@${cleanText}`;
    }
    // @"Display name"#UserID
    return `@"${cleanText}"${user.id()}`;
  } else {
    // @"Display name"#pPostID
    return `@"${cleanText}"#p${postId}`;
  }
}
