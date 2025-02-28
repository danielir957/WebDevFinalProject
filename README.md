# WebDevFinalProject

A full‑stack task management web application built for a Web Development final project. This project features an Express‑based backend using Redis for persistent storage and a separate static frontend with multiple screens and a custom UI design. The application includes a Welcome page, Home/Tasks page, Add Task page, and a Timer page with digital scoreboard animations and smooth UI transitions.

## Features

- **Full‑Stack Application:**  
  - **Backend:** Node.js, Express, Redis  
  - **Frontend:** HTML, CSS, JavaScript (vanilla) with custom animations and responsive design
- **Multiple Screens:**
  - **Welcome Page:** Greets the user with a personalized welcome message and a custom GIF.
  - **Home/Tasks Page:** Displays tasks in rectangles with swaps, and circular action buttons (Start, Delete, Move).
  - **Add Task Page:** Allows users to add tasks with an optional description. Opens in a new tab and, after submission, closes and refreshes the Home page.
  - **Timer Page:** Shows task details and a timer with a buffer GIF animation. after submission, closes and refreshes the Home page.
- **UI/UX Details:**
  - Custom color scheme with space gray backgrounds (adjusted per page), curved rectangles, circular buttons with hover effects, and use of the **Pacifico** font.
  
## Technologies Used

- **Backend:** Node.js, Express.js, Redis  
- **Frontend:** HTML, CSS, JavaScript, Google Fonts (Pacifico).


## Deploying the Static Website via GitHub Pages

1. **Push Your Code to GitHub:**
   - Initialize a Git repository in your project root if you haven’t already.
   - Ensure your `.gitignore` excludes `node_modules` and sensitive files.
   - Commit your code and push it to GitHub (e.g., on the `main` branch).

2. **Configure GitHub Pages:**
   - Go to your repository on GitHub.
   - Click on the **Settings** tab, then navigate to **Pages**.
   - Under **Source**, select your branch (e.g., `main`) and set the folder to `/frontend` if available.
     - If not available, you can either move the contents of the `frontend` folder to the repository root or create a dedicated `gh-pages` branch with only the contents of the `frontend` folder.
   - Save your settings. GitHub Pages will then provide a URL (e.g., `https://yourusername.github.io/your-repository/`).

3. **Update Frontend API Endpoints (if needed):**
   - In `home.js` and `task.js`, update the API endpoints to point to your deployed backend URL (e.g., Railway URL).

4. **Test Your Deployment:**
   - Open the GitHub Pages URL in your browser (or on your iPhone) to verify the static site loads and functions correctly.

## Local Development

### Running the Backend Locally
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   npm install
   npm start

### Running the Frontend Locally
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npx http-server

2. Open the provided URL (e.g., http://localhost:8080/welcome.html) in your browser to test the static site locally.
