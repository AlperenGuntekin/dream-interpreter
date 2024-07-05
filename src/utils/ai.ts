import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
  console.error(
    'OpenAI API key is missing. Please check your environment variables.'
  );
} else {
  console.log('OpenAI API key loaded successfully.');
}

export async function interpretDream(dream: string): Promise<string> {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a dream interpreter. Analyze the following dream and provide an interpretation.',
      },
      { role: 'user', content: dream },
    ],
    max_tokens: 500,
  };

  try {
    const response = await axios.post(apiUrl, data, { headers });
    console.log('API Response:', response.data);
    const jsonResponse = response.data?.choices?.[0]?.message?.content;
    if (!jsonResponse) {
      throw new Error('Invalid response from OpenAI API');
    }
    return jsonResponse;
  } catch (error: any) {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
    } else {
      console.error('Error interpreting dream:', error.message, error.stack);
    }
    throw new Error('Failed to interpret dream');
  }
}
