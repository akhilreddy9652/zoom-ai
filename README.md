# 🤖 AI Zoom Avatar Bot - Iron Man Edition

An AI-powered avatar that attends Zoom meetings on your behalf using **HeyGen's Streaming Avatar API**. The bot listens to meeting participants, generates intelligent responses using GPT, and speaks through a realistic AI avatar - all in real-time!

## 🎯 Features

- **🎭 HeyGen Streaming Avatar** - Realistic AI avatar that speaks and moves naturally
- **🤖 AI-Powered Responses** - Uses OpenAI GPT to generate intelligent, context-aware responses
- **📞 Zoom Integration** - Joins Zoom meetings as a participant
- **🎤 Real-Time Interaction** - Listens to participants via speech-to-text and responds automatically
- **🦾 Iron Man Personality** - Responds in the witty, confident style of Tony Stark
- **🎮 Web Control Panel** - Beautiful UI to start/stop the bot and manually control responses
- **⚡ Live Streaming** - Streams avatar video and audio directly to Zoom

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           AI Avatar Bot System                   │
├─────────────────────────────────────────────────┤
│                                                   │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Zoom    │◄──►│   Bot    │◄──►│  HeyGen  │  │
│  │ Meeting  │    │  Core    │    │  Avatar  │  │
│  └──────────┘    └──────────┘    └──────────┘  │
│       ▲               ▲                           │
│       │               │                           │
│  ┌────┴────┐    ┌────┴────┐                     │
│  │ Speech  │    │   AI    │                     │
│  │   STT   │    │  (GPT)  │                     │
│  └─────────┘    └─────────┘                     │
└─────────────────────────────────────────────────┘
```

## 📋 Prerequisites

Before you begin, you need to obtain API keys from:

1. **HeyGen** - For the streaming avatar
   - Sign up at https://heygen.com
   - Get your API key from the dashboard
   - Note: You may need a paid plan for streaming avatars

2. **OpenAI** - For AI responses
   - Sign up at https://platform.openai.com
   - Create an API key

3. **Zoom** - For meeting integration
   - Create a Zoom app at https://marketplace.zoom.us
   - Get SDK credentials

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# HeyGen Configuration
HEYGEN_API_KEY=your_heygen_api_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Zoom Configuration
ZOOM_MEETING_ID=123-456-789
ZOOM_MEETING_PASSWORD=your_meeting_password

# Optional: Customize avatar
AVATAR_NAME=Iron Man Assistant
```

### 3. Run the Server

```bash
npm start
```

The server will start at `http://localhost:3000`

## 📖 Usage

### Web Interface

1. Open your browser and go to `http://localhost:3000`
2. Click **"Start Avatar Bot"** to join the meeting
3. The bot will:
   - Join the Zoom meeting
   - Activate the HeyGen avatar
   - Start listening to participants
   - Respond automatically when addressed

### API Endpoints

You can also control the bot programmatically:

```bash
# Start the bot
curl -X POST http://localhost:3000/api/start

# Stop the bot
curl -X POST http://localhost:3000/api/stop

# Get status
curl http://localhost:3000/api/status

# Make the avatar speak
curl -X POST http://localhost:3000/api/speak \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello from Iron Man!"}'
```

## 🎮 How It Works

1. **Meeting Join**: Bot connects to Zoom meeting using the SDK
2. **Avatar Activation**: Creates a HeyGen streaming session with the Iron Man avatar
3. **Audio Processing**: Captures meeting audio and converts speech to text
4. **AI Processing**: When a question is detected or the bot is addressed:
   - Text is sent to OpenAI GPT
   - GPT generates a response in Iron Man's style
   - Response is queued for the avatar
5. **Avatar Response**: HeyGen avatar speaks the AI-generated response
6. **Video Streaming**: Avatar video is streamed to Zoom in real-time

## ⚙️ Configuration

### Avatar Personality

Edit `src/config.js` to customize the avatar's behavior:

```javascript
avatar: {
  name: 'Iron Man Assistant',
  systemPrompt: `Your custom personality prompt here...`,
}
```

### Meeting Settings

Set these in your `.env` file:

```env
ZOOM_MEETING_ID=your_meeting_id
ZOOM_MEETING_PASSWORD=your_password
```

## 🔧 Advanced Configuration

### Speech Recognition

The system uses speech-to-text to transcribe meeting audio. For production use, integrate with:
- Google Cloud Speech-to-Text
- Azure Speech Services
- Deepgram

### Video Streaming

For full Zoom integration, you'll need to implement:
- Zoom Meeting SDK for bots
- WebRTC for video/audio streams
- Virtual camera for avatar feed

## 🎨 Customization

### Change Avatar

1. Go to HeyGen dashboard
2. Create or select an avatar
3. Copy the avatar ID
4. Update `.env`:

```env
HEYGEN_AVATAR_ID=your_avatar_id
```

### Change Voice

Update the voice in `.env`:

```env
AVATAR_VOICE=en-US-Neural2-J
```

## 📁 Project Structure

```
ai-zoom-avatar/
├── src/
│   ├── index.js           # Main entry point
│   ├── config.js          # Configuration
│   ├── bot.js             # Bot orchestrator
│   ├── server.js          # Express server
│   └── services/
│       ├── heygen.js      # HeyGen API integration
│       ├── ai.js          # OpenAI GPT integration
│       ├── zoom.js        # Zoom SDK integration
│       └── speech.js      # Speech-to-text service
├── public/
│   ├── index.html         # Web control panel
│   ├── style.css          # Styling
│   └── script.js          # Frontend JavaScript
├── package.json
├── .env.example
└── README.md
```

## 🚨 Important Notes

### Limitations

1. **Zoom SDK Integration**: The current implementation is a framework. Full Zoom bot functionality requires:
   - Zoom Meeting SDK or Meeting Bot API setup
   - WebRTC implementation for video/audio
   - Additional OAuth authentication

2. **Speech Recognition**: Placeholder implementation included. For production:
   - Integrate real STT service (Google, Azure, Deepgram)
   - Implement Voice Activity Detection (VAD)

3. **HeyGen API**: Requires paid plan for streaming avatars

### Production Checklist

Before using in production meetings:

- [ ] Test in a private meeting first
- [ ] Verify audio quality
- [ ] Test response latency
- [ ] Check API rate limits
- [ ] Implement error handling
- [ ] Add logging and monitoring
- [ ] Secure API keys properly

## 💡 Tips

- **Meeting Etiquette**: Inform participants that an AI avatar is present
- **Response Triggers**: Bot responds when:
  - Its name is mentioned ("Iron Man", "Tony", "Stark")
  - A question is asked in the meeting
  - Someone directly addresses it

- **Manual Control**: Use the web interface to make the avatar speak manually
- **Queue System**: Multiple responses are queued to prevent overlap

## 🐛 Troubleshooting

### Bot won't start
- Check all API keys are set correctly
- Ensure meeting ID is valid
- Check API service status

### No audio/video in Zoom
- Verify Zoom SDK credentials
- Check WebRTC connection
- Ensure proper permissions

### Avatar not responding
- Check OpenAI API key
- Verify STT service is working
- Check conversation logs

## 📚 Resources

- [HeyGen API Documentation](https://docs.heygen.com)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Zoom Meeting SDK](https://developers.zoom.us)

## 📄 License

MIT License - feel free to use and modify!

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

**Built with ❤️ using HeyGen, OpenAI, and Zoom APIs**
