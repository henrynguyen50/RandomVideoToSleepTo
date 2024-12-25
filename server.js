import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import OpenAI from "openai";

const STATIC_QUERIES = [
    "relaxing nature documentaries",
    "unsolved mysteries compilation",
    "calm ocean waves and wildlife",
    "soft spoken history documentaries",
    "peaceful animal migration stories",
    "quiet science explanation videos",
    "sports stories",
    "serene landscape tours"
];

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/generate-queries", async (req, res) => {
    try {
        const { prompt } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 50,
            temperature: 0
        });
        return res.send(completion.choices[0].message.content);
    } catch (openaiError) {
        console.error("OpenAI failed, falling back to static queries:", openaiError);
        const randomQuery = STATIC_QUERIES[Math.floor(Math.random() * STATIC_QUERIES.length)];
        return res.send(randomQuery);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});