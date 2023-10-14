import { type GitHubPullRequestComment } from "@/types/github/index.js";
import { HttpClient } from "../index.js";

const httpClient = new HttpClient(`${process.env.GIT_HUB_BASE_URL}`);

export async function getPRComments(repositoryName: string, prId: string) {
  const data = await httpClient.get<GitHubPullRequestComment[]>(
    `${repositoryName}/pulls/${prId}/comments`
  );
  return data;
}
