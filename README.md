# Hrishikesh Dhole – Portfolio Website 💼

Welcome to my personal portfolio website!  
This site showcases my background, technical skills, experience, and an interactive **AI-powered chatbot** built using **Google Gemini API**.

🌐 **Live Demo**: [https://hrishikesh-dhole.vercel.app](https://hrishikesh-dhole.vercel.app)

---

## 🚀 Features

- ✨ Modern, responsive design with clean custom CSS
- 🧠 AI Chatbot trained on my resume and live site using Gemini API (via Google AI Studio)
- 📄 Resume download available
- 📱 Mobile-first layout
- 🌙 Dark mode ready (optional)
- 💬 Dynamic chat component with user/AI bubbles

---

## 💪 Built With

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [Google Gemini API](https://makersuite.google.com/app)
- [Vercel Hosting](https://vercel.com)

---

## 📂 Project Structure (App Router)

![image](https://github.com/user-attachments/assets/b3304908-2f42-47fa-ab75-41b08c0692f2)

---

## 💡 Gemini AI Chatbot (RAG Style)

This chatbot allows users to ask questions about my skills, resume, and **live site content**.  
It uses **Google Gemini's `generateContent` endpoint**, powered by:

- `Docs.json`: Manually curated experience/resume snippets
- `hrishikesh-dhole.vercel.app`: Live content fetched and parsed in real-time

**Prompt Structure Example:**

![image](https://github.com/user-attachments/assets/1aabeca3-db6e-428f-be76-5241b38cdb0a)

Question: What are Hrishikesh’s top skills?

---

## 🔮 Run Locally

```bash
git clone https://github.com/Hrish52/Portfolio-App.git
cd Portfolio-App
npm install

Create a .env.local file:
GEMINI_API_KEY=your_google_api_key_here

Start the dev server:
npm run dev
```

---
## ☁️ Deploying to Vercel
Push your code to GitHub

Go to vercel.com → New Project → Import repo

Set GEMINI_API_KEY in Vercel → Settings → Environment Variables

Deploy and go live!

---
## 📩 Contact
If you'd like to connect or collaborate, feel free to reach out on [LinkedIn](https://www.linkedin.com/in/hrishikesh-dhole-43b150159/).

---
## 📄 License
This project is open-source and available under the MIT License.

Credits to [Adrian Twarog](https://www.linkedin.com/in/adrian-twarog/)'s youtube channel which helped me to build this amazing portfolio
