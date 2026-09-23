const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB } = require("./Config/databaseConfig");

const BVNroute = require("./Routes/bvnRoute");
const NINroute = require("./Routes/ninRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes >>>
app.use("/bvn", BVNroute);
app.use("/nin", NINroute);

// KayaPay API Root Endpoint >>>
app.get("/kayapay", (req, res) => {
  res.status(200).json({
    message: "Welcome to KayaPay API",
    version: "1.0.0",
  });
});

// Test Database Connection >>>
const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(
        `KayaPay server is running on http://localhost:${process.env.PORT}`,
      );
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
