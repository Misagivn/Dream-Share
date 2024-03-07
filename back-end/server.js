const express  = require('express');
const bodyParser  = require("body-parser");
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//Product route
app.use("/products", require("./routes/productRoutes"));
//Order route
app.use("/orders", require("./routes/orderRoutes.js"));
//Type route
app.use("/types", require("./routes/typeRoutes.js"));
//Brand route
app.use("/brands", require("./routes/brandRoutes.js"));
//Staff route
app.use("/staffs", require("./routes/staffRoutes.js"));
//Category route
app.use("/categories", require("./routes/categoryRoutes.js"))

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong, try again in a few minutes",
  });
});

const PORT = process.env.PORT || 5000;

// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(api));
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
