"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieCrawler = void 0;

const crawler_1 = require("./src/crawler");
const args_reader_1 = require("./args-reader");
const scrappers_1 = require("./src/scrappers");
const CookieCrawler = async (url, delay) => {
  // const args = new args_reader_1.ArgsReader().read();
//   console.time("crawl");
  const cookieScrapper = new scrappers_1.CookieScrapper(delay);
  const urlScrapper = new scrappers_1.UrlScrapper();
  const pageScrapper = new scrappers_1.PageScrapper(
    cookieScrapper,
    urlScrapper
  );
  // const crawlers = args.urls.map(url => new crawler_1.WebCrawler(url, pageScrapper).crawl());
  const crawlers = new crawler_1.WebCrawler(url, pageScrapper).crawl();
  // console.log(crawlers);
  // await Promise.all(crawlers);
  return await Promise.resolve(crawlers);
//   console.log(tmp);
//   console.timeEnd("crawl");
};

exports.CookieCrawler = CookieCrawler;
