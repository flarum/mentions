import type User from 'flarum/common/models/User';

/**
 * Whether to use the old mentions format.
 *
 * `'@username'` or `'@"Display name"'`
 */
export const ShouldUseOldFormat = (): boolean => app.forum.data.attributes.allowUsernameMentionFormat || false;

const GetDeletedUserText = (): string => app.translator.trans('core.lib.username.deleted_text') as string;

/**
 * Fetches a user's username or display name.
 *
 * Chooses based on the format option set in the admin settings page.
 *
 * @param user An instance of the User model to fetch the username for
 * @param useDisplayName If `true`, uses `user.displayName()`, otherwise, uses `user.username()`
 */
export default function cleanDisplayName(user: User, useDisplayName: boolean = true): string {
  if (!user) return GetDeletedUserText().replace(/"#[a-z]{0,3}[0-9]+/, '_');

  const text: string = (useDisplayName ? user.displayName() : user.username()) || GetDeletedUserText();

  return text.replace(/"#[a-z]{0,3}[0-9]+/, '_');
}
