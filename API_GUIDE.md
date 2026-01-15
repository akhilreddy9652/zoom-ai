# 🔌 API Integration Guide

This document explains how to integrate with HeyGen and Zoom APIs for production use.

## 🎭 HeyGen Streaming Avatar API

### Getting Started

1. **Sign up**: https://heygen.com
2. **Get API Key**: Dashboard → API Settings → Create API Key
3. **Choose Plan**: Streaming avatars require a paid plan

### API Endpoints Used

#### 1. Create Streaming Session

```javascript
POST https://api.heygen.com/v1/streaming.new

Headers:
  X-Api-Key: your_api_key
  Content-Type: application/json

Body:
{
  "quality": "high",
  "avatar_name": "avatar_id_or_name",
  "voice": {
    "voice_id": "en-US-Neural2-J"
  }
}

Response:
{
  "data": {
    "session_id": "session_123",
    "url": "wss://streaming.heygen.com/..."
  }
}
```

#### 2. Start Avatar Streaming

```javascript
POST https://api.heygen.com/v1/streaming.start

Body:
{
  "session_id": "session_123"
}
```

#### 3. Make Avatar Speak

```javascript
POST https://api.heygen.com/v1/streaming.task

Body:
{
  "session_id": "session_123",
  "text": "Hello, I am your AI assistant!"
}
```

#### 4. Stop Streaming

```javascript
POST https://api.heygen.com/v1/streaming.stop

Body:
{
  "session_id": "session_123"
}
```

### WebSocket Connection

After creating a session, connect to the WebSocket URL:

```javascript
const ws = new WebSocket(session_url);

ws.on('message', (data) => {
  const message = JSON.parse(data);
  
  switch(message.type) {
    case 'stream':
      // Video frame data
      handleVideoFrame(message.data);
      break;
    case 'audio':
      // Audio frame data
      handleAudioFrame(message.data);
      break;
    case 'avatar_start_talking':
      // Avatar started speaking
      break;
    case 'avatar_stop_talking':
      // Avatar finished speaking
      break;
  }
});
```

### Available Avatar IDs

Get list of avatars:

```javascript
GET https://api.heygen.com/v1/avatars

Response:
{
  "avatars": [
    {
      "avatar_id": "avatar_123",
      "avatar_name": "Professional Male",
      "preview_image": "https://..."
    }
  ]
}
```

### Voice Options

Common voice IDs:
- `en-US-Neural2-J` - Male, professional
- `en-US-Neural2-F` - Female, professional
- `en-GB-Neural2-B` - British, male
- And many more...

---

## 📞 Zoom Meeting SDK Integration

### For Production: Zoom Meeting Bot

To actually join Zoom meetings, you need:

### Option 1: Zoom Meeting SDK (Recommended)

1. **Create Zoom App**:
   - Go to https://marketplace.zoom.us
   - Create "Meeting SDK App"
   - Get SDK Key and Secret

2. **Install SDK**:
```bash
npm install @zoom/meetingsdk
```

3. **Initialize**:
```javascript
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

const client = ZoomMtgEmbedded.createClient();

await client.init({
  zoomAppRoot: document.getElementById('meetingSDK'),
  language: 'en-US',
});

await client.join({
  sdkKey: 'your_sdk_key',
  signature: generateSignature(), // Server-side
  meetingNumber: '123456789',
  password: 'meeting_password',
  userName: 'AI Avatar Bot',
});
```

### Option 2: Zoom Meeting Bot API

For headless bots that don't need a browser:

1. **Create Bot App**:
   - Go to Zoom Marketplace
   - Create "Meeting Bot" app
   - Get OAuth credentials

2. **Join Meeting**:
```javascript
POST https://api.zoom.us/v2/meetings/{meetingId}/batch_registrants

Headers:
  Authorization: Bearer {access_token}

Body:
{
  "registrants": [{
    "email": "bot@example.com",
    "first_name": "AI",
    "last_name": "Avatar"
  }]
}
```

3. **Stream Media**:
   - Implement WebRTC connection
   - Send video/audio streams
   - Receive meeting audio

### Generating Zoom Signature (Server-side)

```javascript
import crypto from 'crypto';

function generateSignature(meetingNumber, role) {
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(
    process.env.ZOOM_SDK_KEY + 
    meetingNumber + 
    timestamp + 
    role
  ).toString('base64');
  
  const hash = crypto
    .createHmac('sha256', process.env.ZOOM_SDK_SECRET)
    .update(msg)
    .digest('base64');
  
  const signature = Buffer.from(
    `${process.env.ZOOM_SDK_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`
  ).toString('base64');
  
  return signature;
}
```

---

## 🤖 OpenAI GPT Integration

Already implemented! Here's the setup:

### Configuration

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

### Generate Response

```javascript
const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [
    {
      role: 'system',
      content: 'You are Tony Stark\'s AI assistant...'
    },
    {
      role: 'user',
      content: 'What do you think about this proposal?'
    }
  ],
  max_tokens: 150,
  temperature: 0.8,
});

const response = completion.choices[0].message.content;
```

### Best Practices

1. **Token Management**:
   - Limit conversation history (keep last 10 messages)
   - Set appropriate max_tokens

2. **Cost Optimization**:
   - Use GPT-3.5-turbo for faster, cheaper responses
   - Use GPT-4 for more complex reasoning

3. **Response Quality**:
   - Adjust temperature (0.7-0.9 for creative responses)
   - Craft detailed system prompts

---

## 🎤 Speech-to-Text Integration

### Recommended Services

#### Google Cloud Speech-to-Text

```bash
npm install @google-cloud/speech
```

```javascript
import speech from '@google-cloud/speech';

const client = new speech.SpeechClient();

const request = {
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    enableAutomaticPunctuation: true,
  },
  interimResults: true,
};

const recognizeStream = client
  .streamingRecognize(request)
  .on('data', (data) => {
    const transcription = data.results[0].alternatives[0].transcript;
    if (data.results[0].isFinal) {
      handleTranscription(transcription);
    }
  });

// Pipe audio to the recognize stream
audioStream.pipe(recognizeStream);
```

#### Deepgram (Recommended for real-time)

```bash
npm install @deepgram/sdk
```

```javascript
import { Deepgram } from '@deepgram/sdk';

const deepgram = new Deepgram('your_api_key');

const source = {
  stream: audioStream,
  mimetype: 'audio/wav',
};

const response = await deepgram.transcription.live(source, {
  punctuate: true,
  language: 'en-US',
});

response.addListener('transcriptReceived', (transcription) => {
  const text = transcription.channel.alternatives[0].transcript;
  handleTranscription(text);
});
```

---

## 🎬 Complete Integration Flow

### 1. Start Bot

```
User clicks "Start Bot"
  ↓
Initialize OpenAI
  ↓
Create HeyGen Session
  ↓
Connect to HeyGen WebSocket
  ↓
Start Avatar Streaming
  ↓
Join Zoom Meeting (SDK)
  ↓
Start Audio Capture
  ↓
Initialize Speech-to-Text
  ↓
Bot is Live!
```

### 2. Handle Incoming Speech

```
Zoom Audio → Speech-to-Text → Transcription
  ↓
Check if addressed to bot
  ↓
Send to OpenAI GPT
  ↓
Receive AI Response
  ↓
Send to HeyGen Avatar
  ↓
Avatar Speaks
  ↓
Audio/Video → Zoom Meeting
```

### 3. Stop Bot

```
User clicks "Stop Bot"
  ↓
Queue goodbye message
  ↓
Wait for speech to finish
  ↓
Stop Speech-to-Text
  ↓
Leave Zoom Meeting
  ↓
Stop HeyGen Avatar
  ↓
Close WebSocket
  ↓
Bot Stopped
```

---

## 💰 Cost Estimation

### Typical 1-hour Meeting

- **HeyGen**: ~$5-15 (varies by plan)
- **OpenAI GPT-4**: ~$0.50-2 (depends on interactions)
- **Speech-to-Text**: ~$0.50-1 (Deepgram)
- **Zoom**: Free (SDK is free)

**Total**: ~$6-18 per hour

### Cost Optimization Tips

1. Use GPT-3.5-turbo instead of GPT-4
2. Only transcribe when speech is detected (VAD)
3. Limit avatar video quality if bandwidth is issue
4. Cache similar questions/responses

---

## 🔒 Security Best Practices

1. **API Keys**:
   - Never commit to git
   - Use environment variables
   - Rotate regularly

2. **Meeting Access**:
   - Require meeting passwords
   - Implement waiting room logic
   - Verify meeting permissions

3. **Data Privacy**:
   - Don't log sensitive conversations
   - Comply with recording laws
   - Get participant consent

---

## 📚 Official Documentation Links

- **HeyGen API**: https://docs.heygen.com/reference/api-overview
- **Zoom Meeting SDK**: https://developers.zoom.us/docs/meeting-sdk/
- **OpenAI API**: https://platform.openai.com/docs/api-reference
- **Deepgram**: https://developers.deepgram.com/
- **Google Speech-to-Text**: https://cloud.google.com/speech-to-text/docs

---

## 🆘 Getting Help

### HeyGen Support
- Email: support@heygen.com
- Discord: Check HeyGen website

### Zoom Developer Support
- Forum: https://devforum.zoom.us
- Support: https://developers.zoom.us/support

### OpenAI Support
- Help: https://help.openai.com
- Forum: https://community.openai.com

---

**Good luck with your integration! 🚀**
