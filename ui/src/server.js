import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import proxy from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();

const GRAPHQL_URI = process.env.GRAPHQL_URI || "http://localhost:4001/graphql";
const apiProxy = proxy(GRAPHQL_URI);

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// assign server variable
const server = polka();

// ⚠️ hack to make the proxy work with polka
// express-http-proxy is expecting these methods
server.use(function(req, res, next) {
  res.status = code => (res.statusCode = code);
  res.set = res.setHeader.bind(res);
  next();
});

// proxy to api
server.use("/graphql", apiProxy);

server // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log("error", err);
  });
