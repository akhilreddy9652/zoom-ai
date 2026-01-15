# 🚀 DEPLOYMENT GUIDE - AI Zoom Avatar Bot

## ✅ **Your System is Ready for Deployment!**

Everything is configured. Follow these steps to deploy:

---

## 📋 **Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

**Or if you prefer using npx (no installation):**
```bash
npx vercel
```

---

## 📋 **Step 2: Login to Vercel**

```bash
vercel login
```

This will open your browser. Sign up/login with:
- GitHub (recommended)
- GitLab
- Bitbucket
- Email

**It's FREE!**

---

## 📋 **Step 3: Deploy Your App**

From your project directory:

```bash
cd "/Users/akhilreddy/ai zoom"
vercel
```

**Answer the prompts:**
1. "Set up and deploy?" → **YES**
2. "Which scope?" → **Your account**
3. "Link to existing project?" → **NO**
4. "Project name?" → **ai-zoom-avatar** (or your choice)
5. "Directory?" → **./  (current directory)**
6. "Override settings?" → **NO**

**Vercel will:**
- Build your app
- Deploy to production
- Give you a URL like: `https://ai-zoom-avatar-xyz.vercel.app`

---

## 📋 **Step 4: Add Environment Variables**

After deployment, add your API keys:

### **Option A: Via Web Dashboard**

1. Go to https://vercel.com/dashboard
2. Click your project
3. Settings → Environment Variables
4. Add each variable:

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

### **Option B: Via CLI**

```bash
vercel env add HEYGEN_API_KEY
# Paste: sk_V2_hgu_kYhSI0gPBLA_MUChHZjDTkTRJ9XcpCq9NIcDrQn5GJDo

vercel env add OPENROUTER_API_KEY
# Paste: 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

# ... repeat for all variables
```

---

## 📋 **Step 5: Redeploy with Environment Variables**

```bash
vercel --prod
```

**Your app is now live at:** `https://ai-zoom-avatar-xyz.vercel.app`

---

## 📋 **Step 6: Configure Zoom App**

### **6.1: Go to Zoom Marketplace**

https://marketplace.zoom.us/develop/create

### **6.2: Update Your Meeting SDK App**

1. Click your app (the one with SDK Key: 4KBCzFy7RaeLJXDXglOw)
2. Go to **"App Credentials"**
3. Under **"Allowed Domains"**, add:
   ```
   ai-zoom-avatar-xyz.vercel.app
   ```
   (Replace with YOUR actual Vercel domain)

4. Under **"Redirect URL for OAuth"**, add:
   ```
   https://ai-zoom-avatar-xyz.vercel.app/auth
   ```

5. Click **"Save"**

---

## 📋 **Step 7: Test Your Deployed Bot!**

### **7.1: Open Your Deployed App**

```
https://ai-zoom-avatar-xyz.vercel.app
```

### **7.2: Start the Bot**

1. Click "Start Avatar Bot"
2. Should see: ✅ Avatar bot started successfully!

### **7.3: Join a Zoom Meeting**

1. Create a test Zoom meeting
2. Your avatar should be able to join!

---

## 🎯 **Quick Commands Summary**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd "/Users/akhilreddy/ai zoom"
vercel

# Add environment variables (via dashboard or CLI)
# Then redeploy:
vercel --prod
```

---

## 🆘 **Troubleshooting**

### **"Module not found" errors:**

Make sure package.json has all dependencies:
```bash
npm install
vercel --prod
```

### **Environment variables not working:**

1. Check Vercel dashboard → Settings → Environment Variables
2. Make sure they're set for "Production"
3. Redeploy: `vercel --prod`

### **Zoom SDK not connecting:**

1. Verify domain is whitelisted in Zoom app
2. Check browser console for errors
3. Make sure using HTTPS (not HTTP)

---

## ✅ **Success Checklist**

- [ ] Vercel CLI installed
- [ ] Logged into Vercel
- [ ] App deployed successfully
- [ ] Got deployment URL
- [ ] Environment variables added
- [ ] Redeployed with variables
- [ ] Zoom app domain whitelisted
- [ ] Tested bot start on deployed URL
- [ ] Ready for real meeting test!

---

## 💡 **Next Steps After Deployment**

1. **Test in a real meeting:**
   - Start a Zoom meeting
   - Open deployed app
   - Click "Start Avatar Bot"
   - Avatar joins meeting!

2. **Share with your team:**
   - Send them the deployed URL
   - They can interact with your AI avatar
   - Impress everyone! 😎

3. **Customize:**
   - Change avatar personality
   - Adjust AI responses
   - Add custom features

---

## 🎉 **You're Almost There!**

Your $100 HeyGen investment is about to pay off!

**Just run:**
```bash
vercel login
vercel
```

**And you'll have a live AI avatar bot!** 🚀🦾✨

---

**Questions? Issues? Let me know!**
