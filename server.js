const express = require("express");
const connectDB = require("./config/db");
const user = require("./routes/user");
const profile = require("./routes/profile");
const auth = require("./routes/auth");

const app = express();

connectDB();

// init midleware

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("your app is running...");
});

app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`YOUR APP IS STARTED ON PORT ${PORT}`));
