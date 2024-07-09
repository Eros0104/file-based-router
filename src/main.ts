import express, { Express, Request, Response } from "express";
import { readFile, readdir } from "fs";
import { join } from "path";

const app: Express = express();
const port = 3000;

const routesPath = "routes";

function getRoutes(path: string) {
  const joinedPath = join(__dirname, path);
  readdir(joinedPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    data.forEach((item) => {
      const isDirectory = !item.includes(".");

      if (isDirectory) {
        const newPath = join(path, item);
        getRoutes(newPath);
      } else {
        const filePath = join(joinedPath, item);
        console.log(`Loaded route: ${path}`);

        readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          app.get(`/${path}`, (req: Request, res: Response) => {
            res.send(data);
          });
        });
      }
    });
  });
}

getRoutes(routesPath);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
