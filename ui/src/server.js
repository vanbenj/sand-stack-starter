import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import dotenv from "dotenv";

dotenv.config();

const { PORT, NODE_ENV, SSR_GRAPHQL_URI } = process.env;

console.log("graphql " + SSR_GRAPHQL_URI);

const dev = NODE_ENV === "development";

// assign server variable
const server = polka();

server // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
