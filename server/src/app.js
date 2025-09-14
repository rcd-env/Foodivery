const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const ExpressError = require("./utils/ExpressError");

const authRouter = require("./routes/auth.routes");
const foodRouter = require("./routes/food.routes");

app.use(
  // cors({
  //   origin: "https://foodivery-nu.vercel.app",
  //   credentials: true,
  // })
  cors()
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// auth APIs
app.use("/api/auth", authRouter);
// food APIs
app.use("/api/food", foodRouter);

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
