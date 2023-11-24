import puppeteer from "puppeteer";
import { IncomingMessage, ServerResponse } from "http";

export const webscrapper = (req: IncomingMessage, res: ServerResponse) => {
  let info = "";
  req.on("data", (chunk) => {
    info += chunk;
  });
  req.on("end", async () => {
    if (info.length === 0) {
      res.end(JSON.stringify({ error: "Enter a valid link" }));
    } else {
      let web = JSON.parse(info);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(web.url);
      const title = await page.title();
      const webDescription: string = await page.$eval(
        'meta[name="description"]',
        (element) => element.content
      );
      const images = await page.evaluate(() => {
        const sources = Array.from(document.querySelectorAll("img")).map(
          (image) => image.getAttribute("src")
        );
        return sources;
      });
      await browser.close();

      let finalOutput = {
        title: title,
        description: webDescription,
        images: images,
      };
      res.writeHead(200, { "content-Type": "application/json" });
      res.end(JSON.stringify(finalOutput));
    }
  });
};
