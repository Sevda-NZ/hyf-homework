import express from "express";
import jsonData from "./document.json" assert { type: "json" };

const app = express();

const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.get("/search", (req, res) => {
  const q = req.query.q;
  if (q) {
    const filteredData = jsonData.filter((item) => {
      return item.value.includes(q);
    });
    res.send(filteredData);
  } else {
    res.send(jsonData);
  }
});

app.get("/search/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id) {
    const foundData = jsonData.find((item) => {
      return item.id === id;
    });

    if (foundData) {
      res.send(foundData);
    } else {
      res.status(404).send({ error: "Data not found" });
    }
  }
});

app.post("/search", (req, res) => {
  const { fields } = req.body;
  // fields = JSON.parse(fields);

  if (!fields || typeof fields !== "object") {
    return res.status(400).send({ error: "Invalid request body" });
  }

  // Filter jsonData based on fields
  const filteredData = jsonData.filter((item) => {
    return Object.keys(fields).every((key) => {
      // Check if the field value matches
      return item[key] === fields[key];
    });
  });

  res.send(filteredData);
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
