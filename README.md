# 🎓 UniBudget - Publishing Guide

This app is ready to be published to the web! Follow these steps to take it live.

## 1. Local Setup
1. Download [Node.js](https://nodejs.org/) if you haven't already.
2. Create a folder on your computer and copy all the project files into it.
3. Open your terminal in that folder and run:
   ```bash
   npm install
   ```
4. To see the app running locally, run:
   ```bash
   npm run dev
   ```

## 2. Publishing to Vercel (Recommended)
1. Push your code to a **GitHub** repository.
2. Go to [Vercel.com](https://vercel.com).
3. Click **"Add New"** > **"Project"**.
4. Import your GitHub repository.
5. Vercel will automatically detect **Vite** and deploy the app.
6. **Important**: If you decide to add AI features later, go to the Vercel Dashboard > Settings > Environment Variables and add your `API_KEY`.

## 3. Features
- **Weekly Limit**: Defaulted to 3,500 LKR (editable in the UI).
- **Categories**: Breakfast, Lunch, Dinner, Loans, and Others.
- **Stats**: Visualized daily spending for the last 7 days.
- **Notepad**: A built-in place for shopping lists or reminders.
- **Themes**: Multiple professional color palettes.

## 4. Technical Details
- Built with **React 19** and **Tailwind CSS**.
- Uses **localStorage** for data persistence (no database required for personal use).
- Ready for **Gemini AI** integration via the `services/geminiService.ts`.