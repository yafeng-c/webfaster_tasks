const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.get("/api", async function (req, res) {
  await axios
    .get("https://api.publicapis.org/entries")
    .then(res.status(200).json({ msg: "done" }))
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app;
