import express from "express";
import pa11y from "pa11y";
import cors from "cors";
import axios from "axios";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.get("/api", async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: "url is required" });
  } else {
    const {} = await axios.get(req.query.url);
    const axiosRes = {};
    const pallyRes = await pa11y(req.query.url);

    const results = [axiosRes, pallyRes];
    res.status(200).json(results);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
