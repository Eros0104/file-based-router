import express, { Express, Request, Response } from "express";
import { readFile } from "fs";
import { join } from "path";

const app: Express = express();
const port = 3000;
const routesPath = "./routes";

const filePath = join(__dirname, routesPath, "index.html");

readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  app.get("/", (req: Request, res: Response) => {
    res.send(data);
  }); 
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
