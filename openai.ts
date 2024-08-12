import { OpenAI } from 'openai'
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.OPENAI_API_KEY_NEW;

const openai = new OpenAI({
  apiKey: apiKey,
});

export default openai;