const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const initModels = require("./models/initModels");
const authRoutes = require("./routes/auth.routes");
const trasnporter = require("./utils/mailer");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1/auth", authRoutes);

db.authenticate()
  .then(() => console.log("Base de datos autenticada con exito"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

initModels();
db.sync({ force: false })
  .then(() => console.log("BD sincronizada"))
  .catch((error) => console.log(error));

trasnporter
  .verify()
  .then(() => console.log("Trasnporter ok"))
  .catch((error) => console.log(error));

module.exports = app;
