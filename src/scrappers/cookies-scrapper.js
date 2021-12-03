"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieScrapper = void 0;
class CookieScrapper {
    constructor(waitTime = 0) {
        this.waitTime = waitTime;
    }
    async scrap(page) {
        if (this.waitTime) {
            await page.waitForTimeout(this.waitTime);
        }
        const pageCookies = await page.cookies();
        // const pageUrl = page.url();
        // pageCookies.forEach(cookie => {
        //     console.log(`cookie found in ${pageUrl}: ${cookie.name} | ${cookie.value} | ${cookie.domain}`);
        // });
        return pageCookies;
    }
    ;
}
exports.CookieScrapper = CookieScrapper;
