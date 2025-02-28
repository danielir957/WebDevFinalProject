# WebDevFinalProject

A full‑stack task management web application built for a Web Development final project. The project features an Express‑based backend using Redis for persistent storage and a separate static frontend with multiple screens and custom UI animations. The application includes a Welcome page, Home/Tasks page, Add Task page, and Timer page with a digital scoreboard animation and smooth transitions.

## Features

- **Full‑Stack Application:**
  - **Backend:** Built with Node.js, Express, and Redis for data storage.
  - **Frontend:** Developed using HTML, CSS, and vanilla JavaScript with custom animations, responsive design, curved UI elements, and circular buttons.
- **Multiple Screens:**
  - **Welcome Page:** Greets the user with a personalized welcome message and an animated GIF.
  - **Home/Tasks Page:** Displays tasks in curved rectangles with smooth swap animations and circular action buttons (Start, Delete, Move).
  - **Add Task Page:** Allows users to add tasks with an optional description. This page opens in a new tab and, after submission, closes and refreshes the Home page.
  - **Timer Page:** Shows task details with a digital scoreboard–style timer and a buffer GIF animation. Task content and description are rendered in white for clear visibility.
- **UI/UX Details:**
  - Custom color scheme featuring space‑gray backgrounds, curved rectangles, circular buttons with hover effects, and the **Pacifico** font from Google Fonts.
- **Database Management:**
  - Redis is used for persistent, in-memory storage, with the backend configured to flush the database upon user login.
- **Deployment:**
  - The backend is deployed on Railway.
  - The static frontend is deployed via GitHub Pages.

## Technologies Used

- **Backend:**
  - **Node.js & Express.js:** Server and RESTful API.
  - **Redis:** In-memory persistent data storage.
- **Frontend:**
  - **HTML, CSS, JavaScript:** Building a responsive and interactive UI.
  - **Google Fonts (Pacifico):** For custom typography.
  - **CSS Transitions & Animations:** For smooth UI effects and animations.
- **Deployment:**
  - **Railway:** Hosting the backend.
  - **GitHub Pages:** Serving the static frontend.

## Project Structure

```
WebDevFinalProject/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── routes/
│   │   └── tasks.js
│   └── README.md
├── frontend/
│   ├── add.html
│   ├── add.js
│   ├── index.html
│   ├── index.js
│   ├── home.html
│   ├── home.js
│   ├── task.html
│   ├── task.js
│   ├── styles.css
│   └── images/
│       ├── welcome.gif
│       └── buffer.gif
└── node_modules/          # (Ignored by Git)
```

## Deployment Instructions

### Backend Deployment (Railway)

1. **Push Your Code to GitHub:**  
   Ensure your project—including the `backend` folder—is pushed to GitHub. Use a proper `.gitignore` to exclude `node_modules`, `.env`, and other sensitive files.

2. **Deploy on Railway:**
   - Log in to [Railway](https://railway.app/) and create a new project.
   - Connect your GitHub repository and set the project root to your `backend` folder.
   - Configure the build command: `npm install`  
     Configure the start command: `npm start`
   - **Set Environment Variables:**  
     In Railway’s dashboard, add the following:
     - `REDIS_HOST`
     - `REDIS_PORT`
     - `REDIS_USERNAME`
     - `REDIS_PASSWORD`
   - Deploy your backend and note the public URL (e.g., `https://webdevfinalproject-production.up.railway.app`).

### Frontend Deployment (GitHub Pages)

1. **Create a `gh-pages` Branch:**
   - Create and switch to a new branch called `gh-pages`.
   - Move or copy all files from your `frontend` folder to the root of the `gh-pages` branch.
   - Rename `welcome.html` to `index.html` and `welcome.js` to `index.js` so that the Welcome page is the entry point.
   - The final structure in the `gh-pages` branch should be:
     ```
     gh-pages branch root/
     ├── add.html
     ├── add.js
     ├── home.html
     ├── home.js
     ├── index.html
     ├── index.js
     ├── task.html
     ├── task.js
     ├── styles.css
     └── images/
         ├── welcome.gif
         └── buffer.gif
     ```
   - Commit and push your changes:
     ```bash
     git add .
     git commit -m "Prepare gh-pages branch for GitHub Pages deployment"
     git push -u origin gh-pages
     ```

2. **Configure GitHub Pages:**
   - In your GitHub repository, go to **Settings** > **Pages**.
   - Under **Source**, select the `gh-pages` branch and set the folder to `/` (root).
   - Save your settings. GitHub Pages will provide a URL (e.g., `https://yourusername.github.io/WebDevFinalProject/`).

3. **Update API Endpoints in Frontend:**
   - In your `home.js` and `task.js` files, update the API endpoint variable (`API_URL`) to point to your Railway backend URL:
     ```js
     const API_URL = "https://webdevfinalproject-production.up.railway.app/api/tasks";
     ```

4. **Test Your Deployment:**
   - Visit your GitHub Pages URL in your browser (or on your iPhone) and verify that all pages load and interact with your backend correctly.

### Running the Backend Locally

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   npm install
   npm start

2. Ensure your local Redis instance is running or set the appropriate environment variables in your .env file.

### Running the Frontend Locally

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npx http-server .

2. Then open http://localhost:8080/index.html in your browser to test the static site.

## Additional Security Notes

- **Environment Variables:**
Sensitive credentials (such as Redis connection details) are stored in a .env file, which is added to .gitignore so that it is not committed to GitHub.
- **Custom Domain:**
You can further secure and brand your deployment by setting up a custom domain for your Railway backend and/or GitHub Pages site.

## Conclusion

This project demonstrates a genuine full‑stack application built from scratch for an introductory web development course. It combines standard practices with custom UI/UX enhancements and is deployed using Railway (for the backend) and GitHub Pages (for the static frontend). Enjoy exploring and further enhancing this project!
