const express = require("express");
const cors = require("cors");
const analyticsRoutes = require("./routes/AnalyticsRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("CF Compass Backend is Running 🚀");
});

app.use("/api/profile", profileRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});