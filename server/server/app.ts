import http, { IncomingMessage, Server, ServerResponse } from "http";
import {
  addData,
  deleteData,
  getAllData,
  updateData,
} from "./controllers/engine";
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST" && req.url == "/data/add") {
      return addData(req, res);
    } else if (req.method === "GET" && req.url == "/data/get") {
      return getAllData(req, res);
    } else if (req.method === "PUT" && req.url == "/data/put") {
      return updateData(req, res);
    } else if (req.method === "DELETE" && req.url == "/data/delete") {
      return deleteData(req, res);
    }
  }
);

server.listen(3005, () => console.log("listening from port 3005"));
