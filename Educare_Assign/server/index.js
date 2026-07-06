import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendActivationEmail } from "./email.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    await sendActivationEmail(req.body);

    res.json({ message: "Activation email sent successfully." });
  } catch (error) {
    console.error("Failed to send activation email:", error.message);
    res.status(500).json({ message: "Failed to send activation email." });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the other server or change PORT in .env`
    );
  } else {
    console.error("Server error:", error.message);
  }
  process.exit(1);
});
