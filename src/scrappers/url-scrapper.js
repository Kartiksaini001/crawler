"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlScrapper = void 0;
class UrlScrapper {
    async scrap(page) {
        const urls = await page.$$eval("a", anchors => anchors
            .map((anchor) => anchor.href)
            .filter(href => href && href.includes("http")));
        return urls;
    }
    ;
}
exports.UrlScrapper = UrlScrapper;
