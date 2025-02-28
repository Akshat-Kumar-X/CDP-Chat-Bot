const express = require("express");
const cors = require("cors");
const { getAnswer } = require("./chatbot");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/ask", async (req, res) => {
    try {
        const question = req.query.q;
        if (!question) return res.status(400).json({ error: "Please provide a valid query." });

        const answer = await getAnswer(question);
        res.json(answer);
    } catch (error) {
        console.error("❌ Backend Error:", error.message);
        res.status(500).json({ error: "An internal server error occurred. Please try again later." });
    }
});

app.listen(port, () => console.log(`🚀 Chatbot API running on http://localhost:${port}`));
