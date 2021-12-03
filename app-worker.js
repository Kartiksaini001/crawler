"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const args_reader_1 = require("./args-reader");
const { delay, urls } = new args_reader_1.ArgsReader().read();
urls.forEach(url => {
    const worker = new worker_threads_1.Worker("./app-service-worker.js", {
        workerData: { delay, urls: [url] }
    });
    worker.on("message", message => console.log(message));
    worker.postMessage("Starting new thread worker");
});
