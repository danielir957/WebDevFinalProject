# WebDevFinalProject

A full‑stack task management web application built for a Web Development final project. This project features an Express‑based backend using Redis for persistent storage and a separate static frontend with multiple screens and a custom UI design. The application includes a Welcome page, Home/Tasks page, Add Task page, and a Timer page with digital scoreboard animations and smooth UI transitions.

## Features

- **Full‑Stack Application:**  
  - **Backend:** Node.js, Express, Redis  
  - **Frontend:** HTML, CSS, JavaScript (vanilla) with custom animations and responsive design
- **Multiple Screens:**
  - **Welcome Page:** Greets the user with a personalized welcome message and a custom GIF.
  - **Home/Tasks Page:** Displays tasks in curved rectangles with swaps and circular action buttons (Start, Delete, Move).
  - **Add Task Page:** Allows users to add tasks with an optional description. This page opens in a new tab and, after submission, closes and refreshes the Home page.
  - **Timer Page:** Shows task details and a digital scoreboard‑style timer with a buffer GIF animation. After finishing, the Timer page closes and refreshes the Home page.
- **UI/UX Details:**
  - Custom color scheme with space‑gray backgrounds (each page’s background adjusted as needed), curved rectangles, circular buttons with hover effects, and the use of the **Pacifico** font.
  - Swap animations between task rectangles for a smooth reordering experience.

## Technologies Used

- **Backend:** Node.js, Express.js, Redis, Railway  
- **Frontend:** HTML, CSS, JavaScript, Google Fonts (Pacifico), GitHub Pages

## Project Structure

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

## Deployment Instructions

### Deploying the Backend via Railway

1. **Push Your Code to GitHub:**
   - Initialize a Git repository in your project root.
   - Ensure your `.gitignore` excludes `node_modules` and sensitive files.
   - Commit and push your code (including the `backend` folder) to GitHub (e.g., on the `main` branch).

2. **Deploy the Backend on Railway:**
   - Log in to [Railway](https://railway.app/) and create a new project.
   - Connect your GitHub account and select your repository.
   - Set the root directory to your `backend` folder.
   - Configure the build command (`npm install`) and the start command (`npm start`).
   - Add any necessary environment variables (e.g., `REDIS_HOST`, `REDIS_PORT`, etc.).
   - Deploy the backend and note the provided URL.

### Deploying the Frontend via GitHub Pages

For the frontend, we use a dedicated branch (**gh-pages**) containing only the static files.

1. **Create a `gh-pages` Branch:**
   - Create and checkout a new branch:
     ```bash
     git checkout -b gh-pages
     ```
   - Move (or copy) all files from your `frontend` folder to the root of the `gh-pages` branch.
   - The resulting structure should be:
     ```
     gh-pages branch root/
     ├── add.html
     ├── add.js
     ├── index.html      # Welcome page (entry point)
     ├── index.js
     ├── home.html       # Home/Tasks page
     ├── home.js
     ├── task.html       # Timer page
     ├── task.js
     ├── styles.css
     └── images/
         ├── welcome.gif
         └── buffer.gif
     ```
   - Commit and push your changes to GitHub:
     ```bash
     git add .
     git commit -m "Prepare gh-pages branch for GitHub Pages deployment"
     git push -u origin gh-pages
     ```

2. **Configure GitHub Pages:**
   - In your GitHub repository, navigate to **Settings** > **Pages**.
   - Under **Source**, select the `gh-pages` branch and set the folder to `/` (root).
   - Save your settings. GitHub Pages will then provide a URL, for example:  
     `https://yourusername.github.io/WebDevFinalProject/`

3. **Update API Endpoints:**
   - In your `add.js`, `home.js`,`task.js` and `index.js` files, update the `API_URL` variable to point to your deployed backend URL (e.g., Railway URL).
     ```js
     const API_URL = "https://webdevfinalproject-production.up.railway.app/api/tasks";
     ```
4. **Test Your Deployment:**
   - Open the provided GitHub Pages URL on your desktop or iPhone and verify that all pages load and function correctly.

## Local Development

### Running the Backend Locally

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   npm install
   npm start

### Running the Frontend Locally

1. Navigate to the `frontend` folder:
bash
   cd frontend
   npx http-server .

2. Open the provided URL (e.g., http://localhost:8080/index.html) in your browser to test the static site locally.
