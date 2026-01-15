# 🚀 Quick Start Guide - AI Zoom Avatar Bot

This guide will help you get your AI avatar up and running in minutes!

## 📦 Step 1: Get Your API Keys

### 1.1 HeyGen API Key

HeyGen powers the realistic AI avatar.

1. **Sign Up**: Go to [HeyGen](https://heygen.com) and create an account
2. **Get API Access**: 
   - Navigate to your dashboard
   - Go to API settings
   - Create an API key
   - Copy the key (you'll need it soon!)

**Note**: You may need a paid plan for streaming avatar features.

### 1.2 OpenAI API Key

OpenAI GPT powers the AI's intelligent responses.

1. **Sign Up**: Go to [OpenAI Platform](https://platform.openai.com)
2. **Create API Key**:
   - Go to "API keys" section
   - Click "Create new secret key"
   - Copy the key immediately (you won't see it again!)

**Note**: You'll need to add payment method for API usage.

### 1.3 Zoom Meeting ID (Optional for now)

You'll need the meeting ID when you want to join a meeting. You can add this later.

---

## ⚙️ Step 2: Run Setup Wizard

We've created an easy setup wizard for you:

```bash
npm run setup
```

This will ask you for:
- HeyGen API Key
- OpenAI API Key  
- Zoom Meeting ID (optional)
- Avatar name

The wizard will create your `.env` file automatically!

### Alternative: Manual Setup

If you prefer, you can manually create your `.env` file:

```bash
cp .env.example .env
```

Then edit `.env` and add your keys:

```env
HEYGEN_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
ZOOM_MEETING_ID=123-456-789
AVATAR_NAME=Iron Man Assistant
```

---

## 🎬 Step 3: Start the Server

```bash
npm start
```

You should see:

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        🤖 AI ZOOM AVATAR BOT - Iron Man Edition 🦾           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

🚀 Server: http://localhost:3000
👤 Avatar: Iron Man Assistant
```

---

## 🎮 Step 4: Use the Control Panel

1. **Open Browser**: Go to `http://localhost:3000`
2. **Start Bot**: Click the "Start Avatar Bot" button
3. **Join Meeting**: The bot will:
   - Connect to HeyGen
   - Create the avatar
   - Join your Zoom meeting
   - Start listening and responding!

---

## 💡 How to Use in a Meeting

### The avatar will respond when:

1. **Someone mentions it by name**:
   - "Hey Iron Man, what do you think?"
   - "Tony, can you explain this?"
   - "Mr. Stark, are you there?"

2. **Questions are asked**:
   - "What are the next steps?"
   - "How should we proceed?"
   - Any question with: what, why, how, when, where

3. **Manual control** (via web interface):
   - Type text in the control panel
   - Click "Make Avatar Speak"

---

## 🎯 Testing Before Your Real Meeting

**IMPORTANT**: Test in a personal meeting first!

1. **Create a test Zoom meeting**:
   ```
   - Schedule a new meeting
   - Copy the meeting ID
   - Update your .env file
   ```

2. **Start the bot** with `npm start`

3. **Join the same meeting** from another device

4. **Test interactions**:
   - Say "Hey Iron Man, can you hear me?"
   - Ask a question
   - Use manual speak feature

---

## 🔧 Troubleshooting

### "Missing required environment variables"

**Solution**: Make sure your `.env` file has all required keys:
- `HEYGEN_API_KEY`
- `OPENAI_API_KEY`
- `ZOOM_MEETING_ID`

### "Failed to create HeyGen session"

**Possible causes**:
- Invalid API key
- Insufficient HeyGen plan/credits
- Network issues

**Solution**: 
1. Verify your HeyGen API key
2. Check your HeyGen account status
3. Check HeyGen service status

### "Failed to start bot"

**Check**:
1. All services are running
2. API keys are correct
3. Meeting ID is valid
4. No firewall blocking connections

---

## 📊 Understanding the Status Panel

The web interface shows:

- **Status**: Online/Offline - Is the bot running?
- **In Meeting**: Yes/No - Is the bot in a Zoom call?
- **Speaking**: Yes/No - Is the avatar currently talking?
- **Participants**: Number of people in the meeting
- **Queued Messages**: Responses waiting to be spoken

---

## 🎨 Customization

### Change Avatar Personality

Edit `src/config.js`:

```javascript
avatar: {
  systemPrompt: `Your custom personality here...
  You can make it professional, funny, or anything else!`,
}
```

### Change Avatar Name

In `.env`:

```env
AVATAR_NAME=Your Custom Name
```

### Select Different Voice

In `.env`:

```env
AVATAR_VOICE=en-US-Neural2-J  # Change to any HeyGen voice ID
```

---

## 🚨 Important Notes

### Before Production Use:

- ✅ Test thoroughly in private meetings
- ✅ Inform participants an AI avatar is present
- ✅ Have a backup plan if bot fails
- ✅ Monitor API usage and costs
- ✅ Check meeting recording policies

### Limitations:

1. **Zoom Integration**: Current version is a framework
   - Full video streaming requires additional Zoom SDK setup
   - WebRTC implementation needed for production

2. **Speech Recognition**: Placeholder included
   - Integrate real STT service for production
   - Recommended: Google Speech-to-Text, Deepgram, or Azure

3. **Response Time**: Depends on:
   - Network latency
   - OpenAI API response time
   - HeyGen processing time
   - Typical: 2-5 seconds

---

## 📞 Support Resources

- **HeyGen Docs**: https://docs.heygen.com
- **OpenAI Docs**: https://platform.openai.com/docs
- **Zoom SDK**: https://developers.zoom.us

---

## 🎉 You're Ready!

Your AI avatar bot is now set up and ready to attend meetings!

### Quick Command Reference:

```bash
# Run setup wizard
npm run setup

# Start the server
npm start

# Development mode (auto-restart)
npm run dev
```

### Next Steps:

1. Test in a private meeting
2. Customize the personality
3. Join your first real meeting
4. Enjoy having Iron Man attend for you! 🦾

---

**Questions or issues? Check the main README.md for detailed documentation.**

**Happy meeting-attending! 🤖✨**
