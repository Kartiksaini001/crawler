"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = require("cluster");
const os_1 = require("os");
const crawler_1 = require("./src/crawler");
const args_reader_1 = require("./args-reader");
const scrappers_1 = require("./src/scrappers");
const numCPUs = os_1.cpus().length;
if (cluster_1.default.isMaster) {
    const { delay, urls } = new args_reader_1.ArgsReader().read();
    for (let i = 0; i < numCPUs; i++) {
        if (urls.length) {
            const worker = cluster_1.default.fork();
            worker.send({ delay, urls: [urls.pop()] });
        }
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    process.on("message", function ({ delay, urls }) {
        (async () => {
            console.time(`crawl-${process.pid}`);
            const cookieScrapper = new scrappers_1.CookieScrapper(delay);
            const urlScrapper = new scrappers_1.UrlScrapper();
            const pageScrapper = new scrappers_1.PageScrapper(cookieScrapper, urlScrapper);
            const crawlers = urls.map(url => new crawler_1.WebCrawler(url, pageScrapper).crawl());
            await Promise.all(crawlers);
            console.log(`Worker ${process.pid} started`);
            console.timeEnd(`crawl-${process.pid}`);
            console.log("End");
            process.exit(0);
        })();
    });
}
