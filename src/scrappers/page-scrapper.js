"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageScrapper = void 0;
class PageScrapper {
    constructor(cookieScrapper, urlScrapper) {
        this.cookieScrapper = cookieScrapper;
        this.urlScrapper = urlScrapper;
    }
    async scrap(page) {
        const cookies = await this.cookieScrapper.scrap(page);
        const childrenUrls = await this.urlScrapper.scrap(page);
        const results = { url: page.url(), cookies, childrenUrls };
        return results;
    }
    ;
}
exports.PageScrapper = PageScrapper;
