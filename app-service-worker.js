"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const crawler_1 = require("./src/crawler");
const scrappers_1 = require("./src/scrappers");
worker_threads_1.parentPort.once('message', (message) => {
    console.log(message);
});
const { delay, urls } = worker_threads_1.workerData;
async function execute() {
    console.time("crawl");
    const cookieScrapper = new scrappers_1.CookieScrapper(delay);
    const urlScrapper = new scrappers_1.UrlScrapper();
    const pageScrapper = new scrappers_1.PageScrapper(cookieScrapper, urlScrapper);
    const crawlers = urls.map(url => new crawler_1.WebCrawler(url, pageScrapper).crawl());
    await Promise.all(crawlers);
    console.timeEnd("crawl");
    console.log("End");
}
execute();
