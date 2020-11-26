const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const history = require("connect-history-api-fallback");
require("dotenv").config();

// MongoDB
require("./database");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", require("./routes/register"));
app.use("/api/auth", require("./routes/login"));
app.use("/api", require("./routes/profile"));
app.use("/api", require("./routes/jobs"));
app.use("/api", require("./routes/admin"));


app.get("/api", function (req, res) {
  return res.json({
    status: "API enabled",
  });
});

// Static Files vue history
app.use(history());
app.use(express.static(path.join(__dirname, "public/index.html")));

// Server is listening
const server = app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
