const express = require("express");
const app = express();

const ExpressError = require("./utils/ExpressError");
const authRouter = require("./routes/auth.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// auth APIs
app.use("/api/auth", authRouter);

// Error Handling

app.all("*path", (req, res, next) => {
  next(new ExpressError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  if (status === 404) err.stack = null;
  res.status(status).json({
    status,
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : null,
  });
});

module.exports = app;
