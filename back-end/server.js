const bodyParser  = require("body-parser");
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')
const config = require('./config/db.js');
const userRoutes = require('./routes/authRoutes.js');
const express = require('express');
const session = require('express-session');

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

//Product route
// app.use("/products", require("./routes/productRoutes"));
// //Order route
// app.use("/orders", require("./routes/orderRoutes.js"));
// //Type route
// app.use("/types", require("./routes/typeRoutes.js"));
// //Breand route
// app.use("/brands", require("./routes/brandRoutes.js"));

app.use('/authRoutes', require("./routes/authRoutes.js"));

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
