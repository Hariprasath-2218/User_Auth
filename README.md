# 🔐 UserAuth – Firebase Authentication with React & Tailwind CSS

UserAuth is a sleek and modern authentication system built with **React.js**, styled using **Tailwind CSS**, and powered by **Firebase Authentication**. It supports user registration, login, logout, and password reset—designed with responsiveness and smooth UX in mind.

## 🚀 Features

- 🔐 Email & password registration/login with Firebase
- 🔁 Persistent login session support
- 💌 Password reset via email
- ⚡ Instant form validation
- 🌙 Light/dark mode toggle (optional with Tailwind)
- 📱 Responsive design built with utility-first Tailwind classes

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend/Auth:** Firebase Authentication
- **Bundler:** Vite or Create React App (customizable)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/userauth.git
cd userauth

# Install dependencies
npm install

# Set up Firebase environment variables (see .env setup below)

# Start the development server
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in the root and add your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 Folder Structure

```
userauth/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── firebase/        # Firebase config
│   ├── hooks/           # Custom hooks (e.g. useAuth)
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
├── index.html
└── package.json
```

## 📸 Demo

_Optional: Add screenshots or a live deployed link (e.g. Vercel)_

## 🙌 Acknowledgements

- Built with ❤️ by HARIPRASATH using Firebase, React & Tailwind
- Firebase Docs: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Tailwind CSS: [https://tailwindcss.com](https://tailwindcss.com)

---

Let me know if you want to add live demo badges, collapsible sections, or a "Credits" block for your helper functions and animations. Happy README-polishing!
