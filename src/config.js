import dotenv from 'dotenv';
dotenv.config();

export const config = {
  heygen: {
    apiKey: process.env.HEYGEN_API_KEY,
    avatarId: process.env.HEYGEN_AVATAR_ID || 'default_avatar',
    voice: process.env.AVATAR_VOICE || 'en-US-Neural2-J',
  },
  zoom: {
    sdkKey: process.env.ZOOM_SDK_KEY,
    sdkSecret: process.env.ZOOM_SDK_SECRET,
    meetingSdkKey: process.env.ZOOM_SDK_KEY,
    meetingSdkSecret: process.env.ZOOM_SDK_SECRET,
    meetingId: process.env.ZOOM_MEETING_ID,
    meetingPassword: process.env.ZOOM_MEETING_PASSWORD,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
    model: process.env.AI_MODEL || 'gpt-3.5-turbo',
    baseURL: process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : undefined,
  },
  avatar: {
    name: process.env.AVATAR_NAME || 'Iron Man Assistant',
    systemPrompt: `You are Tony Stark's AI assistant, speaking on his behalf in meetings. 
You are witty, intelligent, confident, and occasionally sarcastic - just like Tony. 
You're attending this meeting as Tony's avatar. Keep responses concise and engaging.
Always stay in character as Iron Man/Tony Stark.`,
  },
  speech: {
    deepgramApiKey: process.env.DEEPGRAM_API_KEY,
    language: 'en-US',
    model: 'nova-2',
  },
  server: {
    port: process.env.PORT || 3000,
  },
};

export function validateConfig() {
  const required = [
    'HEYGEN_API_KEY',
    'ZOOM_MEETING_ID',
  ];

  const missing = required.filter(key => !process.env[key]);

  // Check for either OpenAI or OpenRouter key
  if (!process.env.OPENAI_API_KEY && !process.env.OPENROUTER_API_KEY) {
    missing.push('OPENAI_API_KEY or OPENROUTER_API_KEY');
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
