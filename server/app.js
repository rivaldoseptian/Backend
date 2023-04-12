const express = require("express");
const app = express();

const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./apidocs.json");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use(router);
app.use(errorHandler);

// module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
