document.getElementById("submitName").addEventListener("click", () => {
  const name = document.getElementById("userName").value.trim();
  if (!name) {
    alert("Please enter your name");
    return;
  }
  // Save the user name to localStorage for later retrieval on the Home page.
  localStorage.setItem("userName", name);
  
  // Hide the input section and show welcome message with confetti
  document.getElementById("name-input-section").style.display = "none";
  const welcomeText = document.getElementById("welcomeText");
  welcomeText.textContent = `Welcome, ${name}!`;
  document.getElementById("welcome-message").style.display = "block";
  startConfetti();
  
  // Redirect after 3 seconds to home.html (the Home/Tasks page)
  setTimeout(() => {
    window.location.href = "home.html";
  }, 3000);
});

function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const confettiCount = 150;
  const confetti = [];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.floor(Math.random() * 10) - 10
    });
  }
  let angle = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt, c.y);
      ctx.lineTo(c.x, c.y + c.tilt + c.r);
      ctx.stroke();
    });
    update();
  }
  function update() {
    angle += 0.01;
    confetti.forEach(c => {
      c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(angle);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }
  setInterval(draw, 20);
}
