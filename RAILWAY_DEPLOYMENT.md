# 🚀 RAILWAY DEPLOYMENT GUIDE - STEP BY STEP

## ✅ **Your Code is Ready for Railway!**

Follow these simple steps to deploy:

---

## 📋 **STEP 1: Sign Up for Railway**

1. Go to: **https://railway.app/**
2. Click **"Start a New Project"** or **"Login"**
3. **Sign up with GitHub** (easiest and recommended!)
   - Click "Login with GitHub"
   - Authorize Railway
   - Done! ✅

**It's FREE to start! No credit card required.**

---

## 📋 **STEP 2: Create New Project**

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select: **`akhilreddy9652/zoom-ai`**
4. Click **"Deploy Now"**

Railway will start deploying automatically!

---

## 📋 **STEP 3: Add Environment Variables**

This is CRITICAL! Your bot needs these:

1. In your Railway project, click **"Variables"** tab
2. Click **"New Variable"** for each one:

### **Add These Variables:**

```
HEYGEN_API_KEY=sk_V2_hgu_kYhSI0gPBLA_MUChHZjDTkTRJ9XcpCq9NIcDrQn5GJDo
OPENROUTER_API_KEY=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
AI_MODEL=openai/gpt-3.5-turbo
DEEPGRAM_API_KEY=B12STtMuKY1RFZRLyMjh6K3bZeRocf96
ZOOM_SDK_KEY=4KBCzFy7RaeLJXDXglOw
ZOOM_SDK_SECRET=1o2D1x9Fs5xIHfh7R14N7HeSjYSmNoyi
ZOOM_MEETING_ID=72093095522
ZOOM_MEETING_PASSWORD=dJvhcga4mq3HtJooArm6gZUxSntcsT.1
AVATAR_NAME=Iron Man Assistant
PORT=3000
```

**For each variable:**
- Variable Name: (e.g., `HEYGEN_API_KEY`)
- Variable Value: (paste the actual key)
- Click "Add"

---

## 📋 **STEP 4: Generate Domain**

1. Go to **"Settings"** tab
2. Find **"Networking"** section
3. Click **"Generate Domain"**
4. You'll get a URL like: `https://zoom-ai-production-xyz.up.railway.app`

**Copy this URL!** This is your permanent bot URL! 🎉

---

## 📋 **STEP 5: Wait for Deployment**

Railway will:
- ✅ Build your app
- ✅ Install dependencies
- ✅ Deploy to production
- ✅ Start your bot

**Time:** 2-3 minutes

Watch the **"Deployments"** tab for progress.

---

## 📋 **STEP 6: Configure Zoom App**

1. Go to: https://marketplace.zoom.us/develop/apps
2. Find your SDK app (Key: `4KBCzFy7RaeLJXDXglOw`)
3. Click **"App Credentials"**
4. Under **"Allowed Domains"**, add your Railway domain:
   ```
   zoom-ai-production-xyz.up.railway.app
   ```
   (Use YOUR actual Railway domain, without https://)
5. Click **"Save"**

---

## 📋 **STEP 7: TEST YOUR BOT!**

### **Open Your Railway URL:**
```
https://zoom-ai-production-xyz.up.railway.app
```

You should see your AI Avatar Bot control panel! ✅

### **Click "Start Avatar Bot"**

You should see: ✅ Avatar bot started successfully!

### **Test Speaking:**

In Manual Control:
```
Hello! This is Tony Stark's AI avatar, now running 24/7 on Railway!
```

Click "Make Avatar Speak" ✅

---

## 💰 **Pricing:**

**Railway Pricing:**
- **FREE:** $5 credit per month (enough for testing!)
- **Pro:** $5/month for more usage
- **Pay as you go:** Only pay for what you use

**For your bot:** ~$5-10/month estimated

**You can start FREE and upgrade if needed!**

---

## ✅ **Benefits of Railway:**

✅ **Bot runs 24/7** (no computer needed)  
✅ **Automatic deployments** (push to GitHub = auto-deploy)  
✅ **Permanent URL** (never changes)  
✅ **Professional** (production-ready)  
✅ **Easy to manage** (beautiful dashboard)  
✅ **Reliable** (99.9% uptime)

---

## 🎯 **Checklist:**

- [ ] Sign up for Railway (with GitHub)
- [ ] Create new project
- [ ] Deploy from GitHub repo
- [ ] Add all 10 environment variables
- [ ] Generate domain
- [ ] Wait for deployment
- [ ] Configure Zoom app with Railway domain
- [ ] Test bot at Railway URL
- [ ] Click "Start Avatar Bot"
- [ ] Bot works 24/7! 🎉

---

## 🆘 **Troubleshooting:**

### **Build failed?**
- Check **"Deployments"** → **"View Logs"**
- Make sure all environment variables are added

### **500 error on URL?**
- Check environment variables are correct
- Check deployment logs for errors

### **Bot won't start?**
- Verify HeyGen API key is correct
- Check Railway logs for specific error

---

## 🎉 **SUCCESS!**

After completing these steps:

✅ Your bot is live 24/7  
✅ Accessible worldwide  
✅ No computer needed  
✅ Automatic updates from GitHub  
✅ Professional URL  
✅ Ready for Zoom meetings!  

**Your $100 HeyGen investment is now running in the cloud!** 🚀🦾✨

---

## 🚀 **GO TO RAILWAY NOW:**

**https://railway.app/**

1. Sign up with GitHub
2. Deploy your repo
3. Add environment variables
4. Get your permanent URL!

**Takes 10 minutes total!**
