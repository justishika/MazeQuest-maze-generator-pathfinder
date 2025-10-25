# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Method 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/MazeQuest-maze-generator-pathfinder)

### Method 2: Manual Deploy

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add interactive maze visualizer with pan/zoom and start/end selection"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - **Important Settings:**
     - Root Directory: `frontend`
     - Framework Preset: `Next.js`
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Environment Variables (Optional):**
   - `NEXT_PUBLIC_API_URL`: Your backend URL (if you have one deployed)

### Method 3: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow the prompts
```

## Features Included

✅ **Interactive Start/End Selection**: Click to set custom positions  
✅ **Pan & Zoom Controls**: Smooth navigation with fixed maze size  
✅ **Real-time Algorithm Visualization**: Watch pathfinding in action  
✅ **Futuristic Neon UI**: Dark theme with glowing effects  
✅ **Responsive Design**: Works on all screen sizes  
✅ **Mock API**: Works without backend for demo purposes  

## Demo Features

- Generate AI-enhanced mazes
- Set custom start/end positions
- Pan and zoom around the maze
- Visualize multiple pathfinding algorithms
- Adjustable animation speed
- Beautiful neon UI with animations

## Backend Deployment (Optional)

If you want to deploy the full-stack version:

1. **Deploy Backend to Railway/Render/Heroku:**
   - Upload the `backend` folder
   - Install Python dependencies
   - Set up environment variables

2. **Update Frontend API URL:**
   - Set `NEXT_PUBLIC_API_URL` in Vercel dashboard
   - Point to your deployed backend URL

## Troubleshooting

- **Build Errors**: Make sure all dependencies are in `package.json`
- **API Errors**: The app will fallback to mock API automatically
- **Styling Issues**: Ensure Tailwind CSS is properly configured
- **Deployment Issues**: Check Vercel build logs for specific errors
