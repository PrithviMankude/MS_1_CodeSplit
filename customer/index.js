const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res, next) => {
  return res.status(200).json({ msg: "Hello from customer on PORT 8001" });
});

app.listen(8001, () => {
  console.log("Customer MS is listening on PORT 8001");
});
