import express from "express";
import pa11y from "pa11y";
import cors from "cors";
import axios from "axios";
import sslCertificate from "get-ssl-certificate";

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

      console.log(res);
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

      const results = [axiosRes, pallyRes.issues];
      res.status(200).json(results);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
