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

## Deployment Instructions Using Railway and GitHub

### Prerequisites
- A [GitHub](https://github.com) account.
- A [Railway](https://railway.app/) account.
- (Optional) Redis credentials (you can use Railway’s Redis plugin or connect to Redis Cloud).

### Steps

1. **Push Your Code to GitHub:**
   - Initialize a Git repository in your project folder if you haven’t already.
   - Add a proper `.gitignore` to exclude `node_modules` and environment files.
   - Commit your code and push it to a new GitHub repository.

2. **Deploy the Backend (Express with Redis) on Railway:**
   - Log in to Railway and create a new project.
   - Connect your GitHub account and select your repository.
   - **Set the Root Directory:**  
     Set the project root to the `backend` folder.
   - **Configure Build & Start Commands:**  
     - Build command: `npm install`  
     - Start command: `npm start`
   - **Environment Variables:**  
     Add any necessary environment variables (e.g., `REDIS_HOST`, `REDIS_PORT`, etc.) via Railway’s dashboard.
   - Deploy the backend and note the provided URL.

3. **Deploy the Frontend (Static Site) on Railway:**
   - Create a new Static Site project in Railway.
   - Connect to your GitHub repository and set the root directory to the `frontend` folder.
   - Since this is a static site, you may not need a build command.  
     Set the Publish Directory to the folder containing your HTML files.
   - **Important:** Update API endpoints in your frontend JS files (e.g., in `tasks.js` and `task.js`) to point to the Railway URL of your deployed backend.
   - Deploy the frontend and note the provided URL.

4. **Testing on Your iPhone:**
   - Open the deployed frontend URL in your mobile browser.
   - Test all functionalities (welcome page, adding tasks, reordering, timer functionality, etc.).

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

2. Open the provided URL (e.g., http://localhost:8080/home.html) in your browser to test the static site locally.
