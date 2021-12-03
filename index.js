const express = require("express");
const pa11y = require("pa11y");
const cors = require("cors");
const axios = require("axios");
const sslCertificate = require("get-ssl-certificate");
const CookieCrawler = require("./app.js");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.get("/api", async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: "url is required" });
  } else {
    try {
      // .status .statusText request.host request.protocol=https:
      // Cookies array headers.server['set-cookie'][i].split(";")

      const { status, statusText, headers, request } = await axios(
        req.query.url
      );

      let axiosRes = {
        status,
        statusText,
        headers,
        host: request.host,
        protocol: request.protocol,
        ssl: {},
      };

      const certificate = await sslCertificate.get(axiosRes.host);
      axiosRes.ssl.issuer = certificate.issuer;
      axiosRes.ssl.valid_from = certificate.valid_from;
      axiosRes.ssl.valid_to = certificate.valid_to;

      const pallyRes = await pa11y(req.query.url);

      const { cookies } = await CookieCrawler.CookieCrawler(
        req.query.url,
        1000
      );

      const results = [axiosRes, pallyRes.issues, cookies];
      res.status(200).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
