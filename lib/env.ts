if (!process.env.GROQ_API_KEY) {
  throw new Error('Missing required environment variable: GROQ_API_KEY');
}

export const env = {
  GROQ_API_KEY: process.env.GROQ_API_KEY as string,
};
