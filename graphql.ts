import { graphql, buildSchema } from "https://cdn.pika.dev/graphql@^15.0.0";
import getTweets from "./twitter.ts";

const schema = buildSchema(`
  type Tweet {
    id: String
    full_text: String
  }
  type Query {
    tweets: [Tweet]
  }
`);

const root = {
  tweets: async () => {
    const tweets: any = await getTweets();
    return tweets.statuses;
  },
};

export async function executeQuery(query: string) {
  return graphql(schema, query, root);
}
