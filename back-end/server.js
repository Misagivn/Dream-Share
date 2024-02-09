const express  = require('express');
const bodyParser  = require("body-parser");
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//Product route
app.use("/products", require("./routes/productRoutes"));

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong, try again in a few minutes",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
