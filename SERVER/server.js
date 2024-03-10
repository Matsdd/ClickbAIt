import { ChatOpenAI } from "@langchain/openai";
import { google } from 'googleapis';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
    maxRetries: 10,
});

// Access the API key from the environment variable
const apiKey = process.env.GOOGLE_API_KEY;

// Set up the YouTube API client
const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
});

app.get('/', (req, res) => {
    res.send('Welkom bij Clickbaiter 5000');
});

app.get('/joke', async (req, res) => {
    try {
        // Roep de LangChain Chat API aan om een originele Javascript-grap te genereren
        const joke = await model.invoke("tell me an original Javascript joke!");

        // Log de grap in de serverconsole
        console.log(joke.content);

        // Stuur de grap als JSON naar de client
        res.json({ joke: joke.content });

    } catch (error) {
        // Als er een fout optreedt, stuur een foutreactie met statuscode 500
        console.error("Fout bij het ophalen van de grap:", error);
        res.status(500).json({ error: "Er is een interne fout opgetreden." });
    }
});

app.post('/chat', async (req, res) => {
    try {
        let subject = req.body.Subject;
        let genre = req.body.Genre;
        let weirdness = req.body.Weirdness;

        // Use YouTube Data API to search for videos related to the subject
        const apiKey = process.env.GOOGLE_API_KEY;
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${subject}${genre}&type=video&maxResults=1&key=${apiKey}`;

        const youtubeResponse = await fetch(apiUrl);
        const youtubeData = await youtubeResponse.json();

        // Extract the video title from the YouTube API response
        const videoTitle = youtubeData.items[0]?.snippet.title;

        let engineeredPrompt = `You are a bot that creates clickbait. Make a clickbait title about
            ${subject}. I want it to be in the genre of ${genre}. On a weirdness scale from 1 - 10
        where 1 is not very weird and 10 being very very weird I want it to be a ${weirdness}.
        Don't use contractions like ROFL or LOL also don't use hashtags. Also, don't mention the weirdness level.
        Based on the current popularity, consider a title like '${videoTitle}'.`;


        // Can you repeat this?: ${videoTitle}

        // Call the LangChain Chat API with the user's query
        const response = await model.invoke(engineeredPrompt);

        res.json({ response: response.content });

    } catch (error) {
        console.error("Error processing chat message:", error);
        res.status(500).json({ error: "An internal error occurred." });
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
