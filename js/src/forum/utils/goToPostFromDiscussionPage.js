/**
 * Scrolls to a post if we are on its current page.
 * Otherwise, changes route with `m.route.set`.
 */
export default function goToPostFromDiscussionPage(currDiscussionId, postDiscussionId, postNumber, postRoute) {
  if (currDiscussionId === postDiscussionId) {
    app.current.get('stream').goToNumber(postNumber);
  } else {
    m.route.set(postRoute);
  }
}
