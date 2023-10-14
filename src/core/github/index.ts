import { type GitHubPullRequestComment } from "@/types/github/index.js";

export function formatCommentOutput(comments: GitHubPullRequestComment[]) {
  return comments.map((comment: GitHubPullRequestComment) => {
    return {
      commentId: comment.id,
      commentUrl: comment.url,
      commentUserLogin: comment.user.login,
      commentUserAvatarUrl: comment.user.avatar_url,
      commentBody: comment.body,
      commentCreatedAt: comment.created_at,
      commentHtmlUrl: comment.html_url,
      commentDiffHunk: comment.diff_hunk,
    };
  });
}
