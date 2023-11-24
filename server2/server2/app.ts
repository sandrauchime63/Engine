import http, { IncomingMessage, Server, ServerResponse } from "http";
import { webscrapper } from "./engine";
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST" && req.url === "/scrape") {
      return webscrapper(req, res);
    }
  }
);

server.listen(3005, ()=> console.log("server listening on port 3005"));
