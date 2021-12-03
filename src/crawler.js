"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebCrawler = void 0;
const puppeteer_1 = require("puppeteer");
class WebCrawler {
    constructor(url, pageScrapper, browser) {
        this.url = url;
        this.pageScrapper = pageScrapper;
        this.browser = browser;
    }
    async crawl() {
        this.browser = this.browser ?? await puppeteer_1.launch();
        const page = await this.browser.newPage();
        await page.goto(this.url);
        const result = await this.pageScrapper.scrap(page);
        await this.browser.close();
        return result;
    }
}
exports.WebCrawler = WebCrawler;
