# 🔐 API Key Configuration

## Environment Variables to Set

### For Vercel (Frontend):
```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_API_KEY=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
```

### For Railway/Render/Heroku (Backend):
```
API_KEY=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
```

## 🚀 Deployment Steps

### 1. Deploy Backend with API Key
- Deploy to Railway/Render/Heroku
- Set environment variable: `API_KEY=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`
- Get your backend URL (e.g., `https://mazequest-backend.railway.app`)

### 2. Deploy Frontend with API Key
- Deploy to Vercel
- Set environment variables:
  - `NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app`
  - `NEXT_PUBLIC_API_KEY=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`

### 3. Test the Connection
- Frontend will authenticate with backend using the API key
- Real AI maze generation will work with PyTorch
- Console will show: "✅ AI backend connected!"
