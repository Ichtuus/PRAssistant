import * as dotenv from "dotenv";
import fs from "fs";
import { getPRComments } from "./api/github/index.js";
import { formatCommentOutput } from "./core/github/index.js";
import OpenAIApiWrapper from "./api/openAI/index.js";
dotenv.config();

const repositoryName = process.argv[2];
const prId = process.argv[3];

(async () => {
  console.log("INIT");
  const comments = await getPRComments(repositoryName, prId);
  const formattedComments = formatCommentOutput(comments);
  const AI = new OpenAIApiWrapper(`${process.env.OPEN_AI_KEY}`);

  const responses = await Promise.all(
    formattedComments.map(async (comment, index) => {
      const IAResponse = await AI.generateText(
        `
            ${process.env.OPEN_AI_PROMPT}
            
            commentBody: ${comment.commentBody},
            commentDiffHunk: ${comment.commentDiffHunk}
            `
      );

      return { index, IAResponse };
    })
  );

  fs.writeFile(
    "iar_response.txt",
    responses.map((item) => item.IAResponse).join("\n"),
    (err: any) => {
      if (err) {
        console.error("Error when writing file", err);
      } else {
        console.log("Response write in iar_response.txt");
      }
    }
  );
})();
