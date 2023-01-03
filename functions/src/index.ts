import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors({ origin: true }));

interface AiChatRequest {
  message: string;
}

app.post('/chat-with-ai', async (req, res) => {
  try {
    const request: AiChatRequest = req.body;
    const openAiRequest = {
      model: 'text-davinci-003',
      prompt: generatePrompt(request.message),
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [' Human:', ' Jane:'],
    };

    const completion = await openai.createCompletion(openAiRequest);
    const aiResponse = completion.data.choices[0].text;

    if (aiResponse) {
      res.status(200).send({ aiResponse });
      return;
    }

    res.status(500).send('Completion is undefined');
  } catch (err) {
    res.status(500).send(err);
  }
});

function generatePrompt(message: string): string {
  return (
    'The following is a conversation with an AI assistant named Jane. Jane is funny, clever, and very friendly.\n' +
    'Human: Hello, who are you?\n' +
    'Jane: I am an AI named Jane built to help my friend Daniel. How can I help you today?\n' +
    'Human: ' +
    message +
    '\nJane:'
  );
}

export const backend = functions.https.onRequest(app);
