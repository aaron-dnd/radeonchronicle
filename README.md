 🎉 RadeonChronicle — Next.js News Aggregator
🚀 Overview

RadeonChronicle is a sleek, responsive news aggregator built with **Next.js** and **Tailwind CSS**.  
Fetches articles from NewsAPI and offers categories, search, pagination, dark mode, and more.  

---

⚙️ Features

- 📰 Fetches news from NewsAPI (headlines, categories, search)  
- 🌙 Dark mode toggle with persistence  
- 📱 Responsive UI with Tailwind CSS  
- 📦 Modular, clean React components  
- 🎨 Placeholder image fallback for missing images  
- 🔄 Pagination for browsing news pages  
- 📑 Article detail page with session storage caching

---

🛠️ Prerequisites

- Node.js 18+  
- npm or yarn  
- [NewsAPI API key](https://newsapi.org)

---

💻 Local Setup

1. Clone the repository:
git clone https://github.com/aaron-dnd/radeonchronicle.git
cd radeonchronicle


2. Install dependencies:
npm install
or
yarn install


3. Create `.env.local` with:
NEXT_PUBLIC_API_BASE_URL=https://newsapi.org/v2
NEXT_PUBLIC_NEWS_API_KEY=YOUR_API_KEY_HERE


4. Add a placeholder image at `public/placeholder.jpg`

5. Run the development server:
npm run dev
or
yarn dev

http://localhost:3000/

