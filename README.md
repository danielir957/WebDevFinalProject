# WebDevFinalProject

A full‑stack task management web application built for a Web Development final project. The project features an Express‑based backend using Redis for persistent storage and a separate static frontend with multiple screens and custom UI animations. The application includes a Welcome page, Home/Tasks page, Add Task page, and Timer page with a digital scoreboard animation and smooth transitions.

## Full‑Stack Application

This project is a complete, integrated web application that covers both the client and server sides:
- **Backend:** Built with Node.js and Express, it handles all API endpoints and uses Redis to persistently store task data.
- **Frontend:** A static website built using HTML, CSS, and vanilla JavaScript. It includes multiple screens:
  - **Welcome Page (index.html):** Greets users with personalized welcome text and an animated GIF.
  - **Home/Tasks Page (home.html):** Displays tasks in curved rectangles with smooth swap animations and circular action buttons for starting, deleting, and reordering tasks.
  - **Add Task Page (add.html):** Allows users to add new tasks with an optional description. This page opens in a new tab, and after submission, it automatically closes and refreshes the Home page.
  - **Timer Page (task.html):** Presents task details with a digital scoreboard–style timer and a buffer GIF animation. Task content and description are forced to white for improved readability.
- **UI/UX:** Custom color scheme with space‑gray backgrounds, curved UI elements, circular buttons with hover effects, and the use of the **Pacifico** font to create a unique look.

## Technologies Used

- **Backend:**
  - **Node.js & Express.js:** For building the server and creating RESTful API endpoints.
  - **Redis:** For in-memory, persistent storage of task data.
- **Frontend:**
  - **HTML, CSS, JavaScript:** Core technologies for a responsive and interactive UI.
  - **Google Fonts (Pacifico):** For custom typography.
  - **CSS Transitions & Animations:** For swap animations, confetti effects, and a digital scoreboard timer.
- **Deployment:**
  - **Railway:** Used to host the backend service (Express and Redis).
  - **GitHub Pages:** Used to deploy the static frontend.

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

## Deployment Instructions Using Railway and GitHub Pages

### Backend Deployment (Railway)
1. **Push Your Code to GitHub:**  
   Ensure your project (including the `backend` folder) is pushed to a GitHub repository.
2. **Deploy on Railway:**  
   - Create a new project in [Railway](https://railway.app/) and connect your GitHub repository.
   - Set the root directory to the `backend` folder.
   - Configure the build command (`npm install`) and the start command (`npm start`).
   - Add necessary environment variables (e.g., `REDIS_HOST`, `REDIS_PORT`).
   - Deploy your backend and note the public URL provided by Railway.

### Frontend Deployment (GitHub Pages)
1. **Create a `gh-pages` Branch:**  
   - Create a new branch called `gh-pages`.
   - Move (or copy) the contents of your `frontend` folder into the root of the `gh-pages` branch.
   - Rename `welcome.html` to `index.html` and `welcome.js` to `index.js` if you want the Welcome page to be the entry point.
2. **Configure GitHub Pages:**  
   - In your GitHub repository, go to **Settings** > **Pages**.
   - Under **Source**, select the `gh-pages` branch and set the folder to `/` (root).
   - Save your settings. GitHub Pages will provide a URL (e.g., `https://yourusername.github.io/WebDevFinalProject/`).
3. **Update API Endpoints:**  
   Update the API endpoint URLs in your frontend JavaScript files (e.g., `home.js` and `task.js`) to point to your Railway backend URL.
4. **Test the Deployed Site:**  
   Open the GitHub Pages URL in your browser or on your iPhone to verify that the static site loads correctly and interacts with the backend.

## Local Development

### Running the Backend Locally

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   npm install
   npm start

2. Ensure that your local Redis instance is running, or update your environment variables accordingly.

### Running the Frontend Locally

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npx http-server .

2. Then open http://localhost:8080/index.html in your browser to test the static site.
