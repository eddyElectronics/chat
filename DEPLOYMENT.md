# ChatAI - Production Deployment Guide

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Build tested locally
- [ ] Performance audit completed
- [ ] Security audit completed
- [ ] Analytics setup
- [ ] Error tracking configured
- [ ] Backup strategy defined

---

## 🔧 Build Configuration

### Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Environment Variables for Production

Create `.env.production`:

```env
# API Configuration
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
VITE_BACKEND_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com

# Analytics
VITE_GA_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Feature Flags
VITE_ENABLE_STREAMING=true
VITE_ENABLE_FILE_UPLOAD=true
VITE_MAX_FILE_SIZE=10485760

# App Configuration
VITE_APP_NAME=BotFahsai
VITE_APP_URL=https://chatai.yourdomain.com
VITE_API_VERSION=v1
```

### Build Optimization

Update `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: "gzip" }),
    compression({ algorithm: "brotliCompress", ext: ".br" }),
    visualizer({ open: true }),
  ],
  build: {
    target: "es2015",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          markdown: ["react-markdown", "react-syntax-highlighter"],
          utils: ["zustand", "date-fns", "nanoid"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

---

## ☁️ Deployment Platforms

### 1. Vercel (Recommended for Frontend)

#### Setup Steps

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Login**

```bash
vercel login
```

3. **Deploy**

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

#### Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_OPENAI_API_KEY": "@openai-key",
    "VITE_BACKEND_URL": "@backend-url"
  }
}
```

#### Add Environment Variables in Vercel Dashboard

```bash
# Go to: Project Settings → Environment Variables
VITE_OPENAI_API_KEY=sk-proj-xxxxx
VITE_BACKEND_URL=https://api.yourdomain.com
```

#### Custom Domain

```bash
vercel domains add chatai.yourdomain.com
```

---

### 2. Netlify

#### Setup Steps

1. **Install Netlify CLI**

```bash
npm i -g netlify-cli
```

2. **Login**

```bash
netlify login
```

3. **Initialize**

```bash
netlify init
```

4. **Deploy**

```bash
netlify deploy --prod
```

#### Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[build.environment]
  NODE_VERSION = "18"
```

#### Environment Variables

```bash
netlify env:set VITE_OPENAI_API_KEY "sk-proj-xxxxx"
netlify env:set VITE_BACKEND_URL "https://api.yourdomain.com"
```

---

### 3. AWS Amplify

#### Setup Steps

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/chatai.git
git push -u origin main
```

2. **AWS Amplify Console**

- Go to AWS Amplify Console
- Click "New App" → "Host Web App"
- Connect GitHub repository
- Configure build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

3. **Environment Variables**
   Add in Amplify Console → Environment Variables:

```
VITE_OPENAI_API_KEY=sk-proj-xxxxx
VITE_BACKEND_URL=https://api.yourdomain.com
```

---

### 4. Docker + Cloud Platform

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_types text/plain text/css text/xml text/javascript
             application/x-javascript application/xml+rss
             application/json application/javascript;

  server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location /assets/ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
      try_files $uri $uri/ /index.html;
    }

    # API proxy (optional)
    location /api/ {
      proxy_pass http://backend:8000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
}
```

#### Docker Compose

```yaml
version: "3.8"

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_BACKEND_URL=http://backend:8000
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DATABASE_URL=${DATABASE_URL}
    restart: unless-stopped
```

#### Deploy Commands

```bash
# Build image
docker build -t chatai:latest .

# Run locally
docker run -p 3000:80 chatai:latest

# Push to Docker Hub
docker tag chatai:latest yourusername/chatai:latest
docker push yourusername/chatai:latest

# Deploy to cloud (example: DigitalOcean)
docker-compose up -d
```

---

### 5. GitHub Pages

#### Setup

1. **Install gh-pages**

```bash
npm install --save-dev gh-pages
```

2. **Update package.json**

```json
{
  "homepage": "https://yourusername.github.io/chatai",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js**

```javascript
export default defineConfig({
  base: "/chatai/", // Replace with your repo name
  // ... rest of config
});
```

4. **Deploy**

```bash
npm run deploy
```

---

## 🔒 Security Best Practices

### 1. API Key Protection

**Never expose API keys in client-side code!**

Use a backend proxy:

```javascript
// src/utils/api.js
export const sendToAI = async (messages) => {
  // ✅ Good: API key on backend
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  return response.json();
};

// ❌ Bad: API key in frontend
const response = await fetch("https://api.openai.com/...", {
  headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` },
});
```

### 2. Content Security Policy

Add to `index.html`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.yourdomain.com;"
/>
```

### 3. Rate Limiting

Implement on backend:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

app.use("/api/", limiter);
```

### 4. Input Sanitization

```javascript
import DOMPurify from "dompurify";

const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};
```

---

## 📊 Monitoring & Analytics

### 1. Google Analytics

```bash
npm install react-ga4
```

```javascript
// src/utils/analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(import.meta.env.VITE_GA_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};
```

### 2. Sentry Error Tracking

```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 3. Performance Monitoring

```javascript
// src/utils/performance.js
export const measurePerformance = () => {
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;

    console.log(`Page Load Time: ${pageLoadTime}ms`);
    console.log(`Connect Time: ${connectTime}ms`);

    // Send to analytics
    trackEvent("Performance", "Page Load", pageLoadTime);
  }
};
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          VITE_OPENAI_API_KEY: ${{ secrets.VITE_OPENAI_API_KEY }}
          VITE_BACKEND_URL: ${{ secrets.VITE_BACKEND_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

---

## 🧪 Testing Before Deployment

### Performance Testing

```bash
# Lighthouse CI
npm install -g @lhci/cli

lhci autorun --collect.url=http://localhost:3000 \
             --assert.preset=lighthouse:recommended
```

### Load Testing

```bash
# k6 load testing
k6 run - <<EOF
import http from 'k6/http';

export default function() {
  http.get('http://localhost:3000');
}

export let options = {
  vus: 100,
  duration: '30s',
};
EOF
```

---

## 📈 Post-Deployment

### 1. Monitoring Checklist

- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Error rate tracking (Sentry)
- [ ] Performance metrics (Google Analytics)
- [ ] API response times
- [ ] User feedback collection

### 2. Backup Strategy

- [ ] Database backups (if applicable)
- [ ] localStorage backup feature
- [ ] Export conversation data
- [ ] Version control for deployments

### 3. Rollback Plan

```bash
# Vercel rollback
vercel rollback

# Git rollback
git revert HEAD
git push origin main
```

---

## 🌐 Custom Domain Setup

### DNS Configuration

```
# A Record
Type: A
Name: @
Value: [Your server IP or CDN IP]
TTL: 3600

# CNAME Record
Type: CNAME
Name: www
Value: chatai.yourdomain.com
TTL: 3600
```

### SSL Certificate

Most platforms (Vercel, Netlify) provide automatic SSL via Let's Encrypt.

For custom setup:

```bash
# Certbot for Let's Encrypt
sudo certbot --nginx -d chatai.yourdomain.com
```

---

## 💰 Cost Estimation

### Monthly Costs (Estimated)

```
Vercel Pro: $20/month
- Unlimited bandwidth
- 100GB bandwidth included
- Custom domains

OpenAI API (GPT-4):
- ~$0.03 per 1K input tokens
- ~$0.06 per 1K output tokens
- 10,000 messages/month ≈ $50-150

Database (if needed):
- PostgreSQL on Heroku: $9/month (Hobby)
- MongoDB Atlas: $0 (Free tier) - $57/month

CDN (Cloudflare):
- Free tier available
- Pro: $20/month

Total: ~$100-250/month for small-scale
```

---

## 📞 Support & Maintenance

### Regular Tasks

- [ ] Monitor error logs weekly
- [ ] Review analytics monthly
- [ ] Update dependencies quarterly
- [ ] Security audits quarterly
- [ ] Performance optimization ongoing

### Emergency Contacts

- Hosting provider support
- DNS provider support
- Payment processing support

---

**Your ChatAI app is now production-ready! 🎉**

For issues or questions, refer to:

- [Main README](README.md)
- [Setup Guide](SETUP.md)
- [API Guide](API_GUIDE.md)
