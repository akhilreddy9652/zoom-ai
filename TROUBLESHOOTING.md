# 🔧 Troubleshooting Guide

Common issues and solutions for the AI Zoom Avatar Bot.

## 🚨 Setup Issues

### "Missing required environment variables"

**Error Message:**
```
❌ Fatal Error: Missing required environment variables: HEYGEN_API_KEY, OPENAI_API_KEY, ZOOM_MEETING_ID
```

**Solution:**
1. Make sure you have a `.env` file in the project root
2. Check that it contains all required variables:
   ```env
   HEYGEN_API_KEY=your_key_here
   OPENAI_API_KEY=your_key_here
   ZOOM_MEETING_ID=your_meeting_id
   ```
3. Run the setup wizard: `npm run setup`

---

### "Cannot find module" errors

**Error Message:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🎭 HeyGen Issues

### "Failed to create HeyGen session"

**Possible Causes:**
1. Invalid API key
2. Insufficient account credits/plan
3. Network connectivity issues
4. HeyGen service unavailable

**Solutions:**

**1. Verify API Key:**
```bash
# Check your .env file
cat .env | grep HEYGEN_API_KEY
```
- Make sure there are no extra spaces
- Verify the key in HeyGen dashboard

**2. Check Account Status:**
- Log into https://heygen.com
- Check your plan and credits
- Streaming avatars require paid plan

**3. Test API Connection:**
```bash
curl -X GET https://api.heygen.com/v1/avatars \
  -H "X-Api-Key: YOUR_API_KEY"
```

**4. Check Service Status:**
- Visit HeyGen status page
- Check their Discord/Twitter for updates

---

### "Avatar not speaking"

**Symptoms:**
- Bot receives messages
- AI generates responses
- But avatar doesn't speak

**Solutions:**

**1. Check Avatar Session:**
- Is the WebSocket connected?
- Check logs for "Avatar started streaming"

**2. Verify Session ID:**
```javascript
// In src/services/heygen.js
console.log('Session ID:', this.sessionId);
```

**3. Check Text Content:**
- Empty text won't trigger speech
- Very long text might timeout
- Special characters might cause issues

**4. API Rate Limits:**
- Check if you're hitting rate limits
- Add delays between requests

---

## 🤖 AI/OpenAI Issues

### "Failed to generate AI response"

**Error Message:**
```
❌ Failed to generate AI response: 401 Unauthorized
```

**Solutions:**

**1. Invalid API Key:**
```bash
# Test your OpenAI key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**2. Insufficient Credits:**
- Check billing: https://platform.openai.com/account/billing
- Add payment method if needed

**3. Rate Limits:**
- Wait a moment and try again
- Reduce request frequency
- Upgrade to higher tier

---

### "AI responses too slow"

**Solutions:**

**1. Use Faster Model:**

Edit `src/config.js`:
```javascript
openai: {
  model: 'gpt-3.5-turbo',  // Faster than gpt-4
}
```

**2. Reduce Token Limit:**
```javascript
max_tokens: 100,  // Shorter responses
```

**3. Adjust Temperature:**
```javascript
temperature: 0.7,  // Lower = faster but less creative
```

---

## 📞 Zoom Issues

### "Cannot join Zoom meeting"

**Note:** Full Zoom integration requires additional setup beyond this framework.

**Current Status:**
- The Zoom service is a framework/placeholder
- Needs Zoom Meeting SDK or Bot API setup
- Requires additional credentials

**To Complete Zoom Integration:**

**Option 1: Zoom Meeting SDK**
1. Create app at https://marketplace.zoom.us
2. Get SDK Key and Secret
3. Implement signature generation
4. Add WebRTC for video streaming

**Option 2: Test Without Zoom**
- Test HeyGen and AI features independently
- Use the manual speak feature
- Verify bot logic works

---

## 🎤 Speech Recognition Issues

### "No transcription appearing"

**Current Status:**
- Speech service is a framework/placeholder
- Needs real STT service integration

**To Complete Speech Integration:**

**Recommended: Deepgram**
```bash
npm install @deepgram/sdk
```

```javascript
import { Deepgram } from '@deepgram/sdk';

const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);
// Implement streaming transcription
```

**Alternative: Google Speech-to-Text**
```bash
npm install @google-cloud/speech
```

---

## 🌐 Server Issues

### "Port 3000 already in use"

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Option 1: Kill Process on Port 3000**
```bash
# Find process
lsof -i :3000

# Kill it
kill -9 [PID]
```

**Option 2: Use Different Port**

Edit `.env`:
```env
PORT=3001
```

---

### "Cannot access from other devices"

**Problem:**
- Server works on localhost
- Can't access from phone/other computer

**Solution:**

**1. Find Your Local IP:**
```bash
ipconfig getifaddr en0  # Mac
```

**2. Update Server to Listen on All Interfaces:**

Edit `src/server.js`:
```javascript
this.app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
```

**3. Access via IP:**
```
http://YOUR_IP:3000
```

---

## 🎨 UI Issues

### "CSS not loading"

**Solutions:**

**1. Hard Refresh:**
- Chrome/Edge: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Safari: `Cmd+Option+R`

**2. Check Console:**
- Open browser DevTools (F12)
- Look for 404 errors
- Verify `public/style.css` exists

**3. Clear Cache:**
```bash
# In browser
Settings → Privacy → Clear Browsing Data
```

---

### "Buttons not working"

**Solutions:**

**1. Check JavaScript Console:**
- Open DevTools (F12)
- Look for JavaScript errors
- Check Network tab for failed API calls

**2. Verify Server is Running:**
```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok"}`

**3. Check API Endpoints:**
```bash
# Test status endpoint
curl http://localhost:3000/api/status
```

---

## 💬 Bot Behavior Issues

### "Bot responds to everything"

**Problem:**
- Avatar speaks too much
- Responds to casual conversation

**Solutions:**

**1. Adjust Detection Logic:**

Edit `src/services/ai.js`:
```javascript
isAddressedToAvatar(message) {
  // Add more specific keywords
  const keywords = [
    'iron man',
    'tony stark',
    'hey bot',  // More specific
  ];
  // Require question mark for general questions
}
```

**2. Add Confidence Threshold:**
```javascript
containsQuestion(message) {
  const hasQuestionMark = message.includes('?');
  const hasQuestionWord = questionWords.some(...);
  
  // Require both for higher confidence
  return hasQuestionMark && hasQuestionWord;
}
```

---

### "Bot doesn't respond to questions"

**Solutions:**

**1. Check Detection Logic:**

Add debug logging in `src/bot.js`:
```javascript
async handleTranscription(data) {
  console.log('Transcription:', data.text);
  const isForAvatar = this.ai.isAddressedToAvatar(data.text);
  const hasQuestion = this.ai.containsQuestion(data.text);
  console.log('For avatar:', isForAvatar, 'Has question:', hasQuestion);
  // ...
}
```

**2. Lower Detection Threshold:**
- Make question detection less strict
- Add more trigger keywords

---

## 🔐 Security Issues

### "API keys exposed in git"

**URGENT FIX:**

**1. Remove from Git History:**
```bash
# Remove .env from git
git rm --cached .env

# Update .gitignore
echo ".env" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove .env from tracking"
```

**2. Rotate ALL API Keys:**
- HeyGen: Generate new key
- OpenAI: Create new key
- Update `.env` with new keys

**3. Check GitHub:**
- If pushed to GitHub, assume keys are compromised
- Rotate immediately

---

## 📊 Performance Issues

### "High CPU usage"

**Solutions:**

**1. Reduce Polling Frequency:**

Edit `public/script.js`:
```javascript
// Change from 3 seconds to 5 seconds
setInterval(refreshStatus, 5000);
```

**2. Optimize Avatar Quality:**

Edit `src/services/heygen.js`:
```javascript
{
  quality: 'medium',  // Instead of 'high'
}
```

---

### "High memory usage"

**Solutions:**

**1. Limit Conversation History:**

Edit `src/services/ai.js`:
```javascript
// Keep only last 5 messages (instead of 10)
messages: [...this.conversationHistory.slice(-5)]
```

**2. Clear Logs Regularly:**
```javascript
// In bot.js
if (this.logs.length > 100) {
  this.logs = this.logs.slice(-50);
}
```

---

## 🆘 Getting More Help

### Check Logs

**Server Logs:**
```bash
# Run with debug output
DEBUG=* npm start
```

**Browser Console:**
- Open DevTools (F12)
- Check Console tab
- Look for errors

### Enable Verbose Logging

Edit `src/config.js`:
```javascript
export const config = {
  // ...existing config
  debug: true,
  logLevel: 'verbose',
};
```

### Test Individual Components

**Test HeyGen Only:**
```bash
# Create test file
node -e "
import { HeyGenService } from './src/services/heygen.js';
const heygen = new HeyGenService();
heygen.createSession();
"
```

**Test OpenAI Only:**
```bash
node -e "
import { AIService } from './src/services/ai.js';
const ai = new AIService();
ai.initialize();
ai.generateResponse('Hello!');
"
```

---

## 📚 Additional Resources

- **HeyGen Support:** support@heygen.com
- **OpenAI Forum:** https://community.openai.com
- **Zoom Developers:** https://devforum.zoom.us
- **Node.js Debugging:** https://nodejs.org/en/docs/guides/debugging/

---

## 🐛 Report an Issue

If you encounter a bug not covered here:

1. Check GitHub issues (if applicable)
2. Gather information:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version)
   - Logs
3. Create detailed bug report

---

**Most issues can be resolved by:**
1. ✅ Checking API keys
2. ✅ Verifying dependencies installed
3. ✅ Reading error messages carefully
4. ✅ Checking service status pages
5. ✅ Testing individual components

**Good luck! 🚀**
