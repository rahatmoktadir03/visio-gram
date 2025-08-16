# VisioGram - AI Image Generation Platform

<div align="center">

![VisioGram](public/next.svg)

**Transform your imagination into stunning visuals with AI-powered image generation**

🎨 Create • 💫 Share • ✨ Inspire

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Modal](https://img.shields.io/badge/Modal-GPU-purple?style=flat)](https://modal.com/)

</div>

## ✨ Features

### 🎨 **AI Image Generation**

- **Stable Diffusion** integration via Modal serverless GPU hosting
- **Smart content moderation** to ensure appropriate image generation
- **Real-time image generation** with loading states and error handling

### 🌟 **Social Platform**

- **Instagram-like interface** with image feed and interactions
- **Like, comment, and bookmark** generated images
- **Share functionality** with native Web Share API support
- **Semantic search** to discover relevant content

### 🎯 **User Experience**

- **Landing-first approach** for new users with smart redirection
- **Dark/Light mode toggle** with system preference detection
- **Responsive design** optimized for all device sizes
- **Smooth animations** and modern UI/UX patterns

### 🔧 **Technical Features**

- **Content moderation API** for safe image generation
- **Recommendation engine** for personalized content discovery
- **Toast notifications** for user feedback
- **Copy, download, and share utilities** for enhanced interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Modal account (for AI image generation)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rahatmoktadir03/visio-gram.git
cd visio-gram
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Modal backend** (Optional - demo works with placeholder images)

```bash
# Install Modal CLI
pip install modal

# Deploy the image generation function
modal deploy modal_app.py
```

4. **Start development server**

```bash
npm run dev
```

5. **Open your browser**

```
http://localhost:3000
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── generate-image/    # AI image generation
│   │   ├── moderate-content/  # Content moderation
│   │   └── recommendations/   # Content recommendations
│   ├── feed/              # Main social feed
│   ├── create/            # Image creation page
│   ├── history/           # User's generation history
│   ├── bookmarks/         # Bookmarked content
│   ├── _profile/          # Profile page (disabled for demo)
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── ImageCard.tsx      # Image display component
│   ├── SearchBar.tsx      # Search functionality
│   ├── ThemeProvider.tsx  # Dark/light mode context
│   └── ThemeToggle.tsx    # Theme switch button
├── utils/                 # Utility functions
│   └── interactions.ts    # User interaction helpers
└── modal_app.py          # Modal serverless functions
```

## 🎨 Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with dark mode
- **Heroicons** - Beautiful SVG icons

### **Backend & AI**

- **Modal** - Serverless GPU compute for AI inference
- **Stable Diffusion** - Text-to-image AI model
- **Next.js API Routes** - Backend API endpoints

### **Features**

- **Responsive Design** - Mobile-first approach
- **Dark Mode** - System preference with manual toggle
- **PWA Ready** - Progressive Web App capabilities
- **SEO Optimized** - Meta tags and semantic HTML

## 🌟 Key Pages

- **`/`** - Landing page with feature showcase
- **`/feed`** - Main social feed with image generation
- **`/create`** - Dedicated image creation interface
- **`/history`** - User's generation history
- **`/bookmarks`** - Saved/bookmarked images

## 🔧 Configuration

### **Image Sources**

The app uses Picsum Photos for placeholder images. For production, integrate with:

- Modal AI image generation API
- Your preferred image hosting service

### **Environment Variables**

```env
# Add your Modal API endpoint if using real AI generation
NEXT_PUBLIC_MODAL_ENDPOINT=your-modal-endpoint
```

## 🎯 Usage

1. **First Visit**: Experience the landing page with feature overview
2. **Returning Users**: Automatically redirected to the main feed
3. **Generate Images**: Use the creation form with text prompts
4. **Social Interaction**: Like, comment, and bookmark images
5. **Search & Discover**: Find images using semantic search
6. **Theme Toggle**: Switch between light and dark modes

## 🚀 Deployment

### **Netlify (Recommended)**

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Deploy!

### **Vercel**

```bash
npm install -g vercel
vercel
```

### **Other Platforms**

The app is a standard Next.js application and can be deployed to any platform supporting Node.js.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Modal** for serverless GPU infrastructure
- **Stability AI** for Stable Diffusion models
- **Vercel** for Next.js framework
- **Tailwind Labs** for amazing CSS framework

---

<div align="center">

**Built with ❤️ by [Rahat Moktadir](https://github.com/rahatmoktadir03)**

[Live Demo](https://your-netlify-url.netlify.app) • [Report Bug](https://github.com/rahatmoktadir03/visio-gram/issues) • [Request Feature](https://github.com/rahatmoktadir03/visio-gram/issues)

</div>
