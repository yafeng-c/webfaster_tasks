const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
app.use(express.json());

function jsontocsv(entries) {
  let header = Object.keys(entries[0]);
  let array = typeof entries != "object" ? JSON.parse(entries) : entries;
  //array = array.slice(0, 20);
  let str = header.join(",") + "\r\n";
  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      line += array[i][index];
      line += ",";
    }
    str += line + "\r\n";
  }
  tocsvfile(str);
}

function tocsvfile(csv) {
  fs.writeFile("./data.csv", csv, (err) => {
    console.log(err || "done");
  });
}

const PORT = process.env.PORT || 5000;
app.get("/api", async function (req, res) {
  await axios
    .get("https://api.publicapis.org/entries")
    .then((res) => jsontocsv(res.data.entries))
    .then(res.status(200).json({ msg: "Saved" }))
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
