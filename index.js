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
    const { headers, status, statusText, request } = await axios.get(
      req.query.url
    );
    let axiosRes = {
      headers,
      status,
      statusText,
      host: request.host,
      protocol: request.protocol,
      ssl: {},
    };

    // .status .statusText request.host request.protocol=https:
    // Cookies array headers.server['set-cookie'][i].split(";")

    const pallyRes = await pa11y(req.query.url);

    sslCertificate.get(axiosRes.host).then((certificate) => {
      axiosRes.ssl.issuer = certificate.issuer;
      axiosRes.ssl.valid_from = certificate.valid_from;
      axiosRes.ssl.valid_to = certificate.valid_to;
      console.log(axiosRes);
      const results = [axiosRes, pallyRes];
      res.status(200).json(results);
    });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
