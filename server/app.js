const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

// module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
