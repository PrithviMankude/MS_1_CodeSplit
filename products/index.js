const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res, next) => {
  return res.status(200).json({ msg: "Hello from PRODUCTS on PORT 8002" });
});

app.listen(8002, () => {
  console.log("Products MS is listening on PORT 8002");
});
