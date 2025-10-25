# 🚀 Complete Deployment Guide for MazeQuest AI

## The Problem
Vercel is frontend-only and cannot run Python/PyTorch backend code. We need to deploy the backend separately.

## 🎯 Solution: Full-Stack Deployment

### Step 1: Deploy Backend to Railway (Python/PyTorch)

**Why Railway?**
- ✅ Supports Python/PyTorch
- ✅ Free tier available
- ✅ Easy deployment
- ✅ Automatic HTTPS

**Deployment Steps:**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Railway deployment configuration"
   git push origin main
   ```

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - **Important:** Set Root Directory to `backend`
   - Railway will automatically detect Python and install dependencies
   - Deploy!

3. **Get Backend URL:**
   - Railway will give you a URL like: `https://your-app.railway.app`
   - Copy this URL for the next step

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard:**
   - [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure Settings:**
   - **Root Directory:** `frontend`
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

3. **Add Environment Variable:**
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-app.railway.app`

4. **Deploy!**

### Step 3: Alternative Backend Hosting

If Railway doesn't work, try these alternatives:

#### Option A: Render (Free Tier)
```bash
# Create render.yaml in backend/
services:
  - type: web
    name: mazequest-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

#### Option B: Heroku
```bash
# In backend/ directory
heroku create mazequest-backend
git subtree push --prefix backend heroku main
```

#### Option C: PythonAnywhere
- Upload backend folder
- Configure WSGI file
- Set up virtual environment

## 🔧 Backend Requirements

Make sure your `backend/requirements.txt` includes:
```
fastapi==0.104.1
uvicorn==0.24.0
torch==2.1.0
numpy==1.24.3
pydantic==2.5.0
```

## 🎯 What You'll Get

### With Real Backend:
- ✅ **AI-Generated Mazes**: Real PyTorch neural networks
- ✅ **Dynamic Parameters**: Density, connectivity, complexity
- ✅ **Unique Mazes**: Each generation is different
- ✅ **Full AI Experience**: Complete machine learning pipeline

### With Mock Backend (Current):
- ❌ Static maze patterns
- ❌ No real AI parameters
- ❌ Limited functionality

## 🚀 Quick Start Commands

```bash
# 1. Push everything to GitHub
git add .
git commit -m "Add full-stack deployment configuration"
git push origin main

# 2. Deploy backend to Railway
# - Go to railway.app
# - Connect GitHub repo
# - Set root directory to 'backend'
# - Deploy

# 3. Deploy frontend to Vercel
# - Go to vercel.com
# - Connect GitHub repo
# - Set root directory to 'frontend'
# - Add environment variable: NEXT_PUBLIC_API_URL = your-railway-url
# - Deploy
```

## 🔍 Testing Your Deployment

1. **Backend Test:**
   - Visit: `https://your-railway-url.railway.app`
   - Should see: `{"message": "MazeQuest AI Backend is running!"}`

2. **Frontend Test:**
   - Visit: `https://your-vercel-url.vercel.app`
   - Click "Generate AI Maze"
   - Should see real AI-generated maze with parameters

## 🎉 Final Result

You'll have:
- **Frontend**: `https://mazequest-ai.vercel.app`
- **Backend**: `https://mazequest-backend.railway.app`
- **Full AI Experience**: Real PyTorch maze generation!

## 🆘 Troubleshooting

### Backend Issues:
- Check Railway logs for Python errors
- Ensure all dependencies are in requirements.txt
- Verify CORS settings allow your Vercel domain

### Frontend Issues:
- Check Vercel build logs
- Verify environment variables are set
- Test API connection in browser dev tools

### Connection Issues:
- Test backend URL directly
- Check CORS configuration
- Verify environment variables in Vercel
