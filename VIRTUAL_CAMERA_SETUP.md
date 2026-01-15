# 🎥 VIRTUAL CAMERA SETUP GUIDE - Step by Step

## ✅ **What We're Building:**

```
HeyGen Avatar Video → OBS Virtual Camera → Zoom Meeting
         ↓                    ↓                  ↓
    (1 credit)           (FREE app)      (Professional Avatar!)
```

**Result:** Your Iron Man avatar appears in Zoom meetings!

---

## 📋 **STEP 1: Create Your Avatar Video in HeyGen**

### **Go to HeyGen:**
https://app.heygen.com/

### **Create the Video:**

1. **Click "Create Video"** (or "Instant Avatar" if available)

2. **Choose Avatar:**
   - Select the avatar you like (male/professional recommended for Iron Man)
   - OR use your custom avatar if you created one

3. **Write Script:**
   ```
   Hello team! Tony Stark here, joining via my AI avatar. 
   I'm listening and will respond through the AI system. 
   Let's make this meeting productive. Jarvis, standby mode.
   ```
   
   **OR shorter loop:**
   ```
   Tony Stark standing by. Ready for the meeting.
   ```

4. **Generate Video:**
   - Click "Generate" or "Submit"
   - Wait 1-3 minutes for processing
   - **This uses 1 of your 10 credits** ✅

5. **Download:**
   - Click "Download" when ready
   - Save to: `/Users/akhilreddy/Downloads/iron-man-avatar.mp4`

---

## 📋 **STEP 2: Install OBS Studio** (FREE)

### **Download OBS:**

**For Mac:**
https://obsproject.com/download

**Direct Link:**
https://cdn-fastly.obsproject.com/downloads/obs-studio-30.0.2-macos-apple.dmg

### **Install:**

1. Open the downloaded `.dmg` file
2. Drag OBS to Applications folder
3. Open OBS Studio from Applications
4. **First time setup:**
   - Click through the auto-configuration wizard
   - Choose "Optimize for recording" (default is fine)
   - Click "Apply Settings"

---

## 📋 **STEP 3: Setup Virtual Camera in OBS**

### **Add Your Avatar Video:**

1. **In OBS, bottom left, find "Sources" panel**

2. **Click the "+" button**

3. **Select "Media Source"**
   - Name it: "Iron Man Avatar"
   - Click "OK"

4. **Browse for your video:**
   - Click "Browse" next to "Local File"
   - Navigate to Downloads
   - Select `iron-man-avatar.mp4`

5. **Configure loop settings:**
   - ✅ Check "Loop"
   - ✅ Check "Restart playback when source becomes active"
   - Click "OK"

6. **Resize to fit:**
   - Click and drag the red box corners to fill the entire canvas
   - Make sure avatar fills the whole screen

### **Start Virtual Camera:**

1. **In OBS, click "Settings"** (bottom right)

2. **Go to "Output" → "Audio Track":**
   - Make sure Track 1 is selected

3. **Click "OK"**

4. **Click "Start Virtual Camera"** button (right side panel)
   - Should say "Virtual Camera Active" ✅

---

## 📋 **STEP 4: Use in Zoom**

### **Configure Zoom:**

1. **Open Zoom**

2. **Go to Settings** (gear icon)

3. **Click "Video"**

4. **Under "Camera", select:**
   - **"OBS Virtual Camera"** 
   - You should see your avatar! ✅

5. **Test it:**
   - Click "Test Video"
   - You should see Iron Man avatar playing!

### **Join a Meeting:**

1. **Start or join a Zoom meeting**

2. **Your avatar will appear as your camera feed!**

3. **Participants see:**
   - Professional avatar video
   - Looping smoothly
   - Instead of your face ✅

---

## 🎯 **BONUS: Add AI Intelligence**

While the avatar video plays, you can still use our AI bot!

### **Option A: Manual Mode**

1. **Keep our server running:**
   ```bash
   npm start
   ```

2. **Open control panel:**
   - http://localhost:3000

3. **During meeting, use "Manual Control":**
   - AI generates Iron Man responses
   - You read them out loud
   - Sounds like Tony Stark! 🦾

### **Option B: Text-to-Speech**

1. **Use macOS built-in TTS:**
   ```bash
   # In terminal, when you have a response:
   say "This is Tony Stark. I agree with that proposal."
   ```

2. **OR use our AI + Deepgram STT:**
   - Our bot listens via Deepgram
   - Generates responses
   - You speak them, or use TTS

---

## 🎨 **Advanced: Multiple Avatar States**

Create different videos for different scenarios:

1. **Greeting Video** (5 seconds)
   - "Hello everyone, Tony Stark joining the call"
   
2. **Listening Loop** (3 seconds)
   - "Standing by" or just subtle movement
   
3. **Speaking States** (3 seconds each)
   - Different expressions
   - Hand gestures

**Switch in OBS:**
- Create multiple Media Sources
- Hide/Show them as needed
- Hot keys for quick switching!

---

## 📊 **What You Achieve:**

✅ **Professional avatar in Zoom**
✅ **Uses only 1 of your 10 HeyGen credits**
✅ **Costs $0 (OBS is free)**
✅ **Works 100% guaranteed**
✅ **Can combine with AI for smart responses**
✅ **Better than video call with your face!**

---

## 🆘 **Troubleshooting:**

### **Can't see avatar in Zoom:**
- Make sure OBS Virtual Camera is started (green button)
- Restart Zoom
- Check Zoom Settings → Video

### **Video looks pixelated:**
- In OBS: Settings → Video
- Set Base Resolution to 1920x1080
- Set Output Resolution to 1920x1080

### **Audio not working:**
- Use your regular mic for audio
- Avatar is video only
- Your voice = you
- Or use TTS for robot voice!

### **OBS won't start Virtual Camera:**
- Go to System Preferences → Security & Privacy
- Allow OBS to access Camera
- Restart OBS

---

## 🎯 **Quick Start Checklist:**

- [ ] Create HeyGen avatar video (5 mins)
- [ ] Download video to Mac
- [ ] Install OBS Studio
- [ ] Add video as Media Source in OBS
- [ ] Enable Loop
- [ ] Start Virtual Camera
- [ ] Open Zoom → Settings → Video
- [ ] Select "OBS Virtual Camera"
- [ ] Test in preview ✅
- [ ] Join meeting - You're Iron Man! 🦾

---

## 💡 **Pro Tips:**

1. **Create a 3-second loop** instead of long video
   - Saves processing time
   - Loops seamlessly
   - More natural

2. **Add background:**
   - Upload background image in HeyGen
   - Looks like high-tech lab
   - More immersive!

3. **Hotkeys in OBS:**
   - Settings → Hotkeys
   - Assign key to Start/Stop Virtual Camera
   - Quick on/off during meeting!

4. **Test before important meetings:**
   - Create a test Zoom meeting
   - Verify everything works
   - Check audio/video quality

---

## 🎉 **You're Done!**

**What you have now:**
- ✅ Professional AI avatar in meetings
- ✅ Zero monthly costs
- ✅ Still have 9 HeyGen credits left
- ✅ Can upgrade to streaming later if needed

**Welcome to the future of meetings!** 🚀🦾

---

**Next Steps:**
1. Go create your HeyGen video now!
2. Download OBS (takes 2 minutes)
3. Follow this guide
4. Test in Zoom
5. Blow people's minds! ✨

**Questions? Just ask!**
