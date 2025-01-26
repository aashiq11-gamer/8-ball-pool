const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let score = 0;
let gameInterval;
let redirectionInterval;

// Game variables
let balls = [];
let blackBall;
const cue = { x: canvas.width / 2, y: canvas.height - 30, angle: 0 };

// Initialize the game
function initGame() {
  score = 0;
  document.getElementById('score').textContent = `Score: ${score}`;
  balls = createRedBalls(10);
  blackBall = createBall(canvas.width / 2, canvas.height / 2, 'black');
  startRedirection();
  gameLoop();
}

// Create red balls
function createRedBalls(count) {
  const redBalls = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * (canvas.width - 20) + 10;
    const y = Math.random() * (canvas.height - 20) + 10;
    redBalls.push(createBall(x, y, 'red'));
  }
  return redBalls;
}

// Create a ball
function createBall(x, y, color) {
  return { x, y, radius: 10, color };
}

// Render the game
function renderGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw cue
  ctx.save();
  ctx.translate(cue.x, cue.y);
  ctx.rotate(cue.angle);
  ctx.fillStyle = 'brown';
  ctx.fillRect(-50, -5, 100, 10);
  ctx.restore();

  // Draw balls
  balls.forEach((ball) => drawBall(ball));
  drawBall(blackBall);
}

// Draw a ball
function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Game logic
function gameLoop() {
  gameInterval = setInterval(() => {
    renderGame();

    // Check collisions
    if (checkCollision(blackBall)) {
      score += 10;
      document.getElementById('score').textContent = `Score: ${score}`;
      blackBall = createBall(
        Math.random() * (canvas.width - 20) + 10,
        Math.random() * (canvas.height - 20) + 10,
        'black'
      );
    }
  }, 16);
}

// Check collision between cue and ball
function checkCollision(ball) {
  const dx = cue.x - ball.x;
  const dy = cue.y - ball.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < ball.radius + 5;
}

// Move cue with arrow keys
document.addEventListener('keydown', (e) => {
  const speed = 10;
  if (e.key === 'ArrowLeft') cue.angle -= 0.1;
  if (e.key === 'ArrowRight') cue.angle += 0.1;
  if (e.key === 'ArrowUp') {
    cue.x += Math.cos(cue.angle) * speed;
    cue.y += Math.sin(cue.angle) * speed;
  }
});

// Start game button
document.getElementById('startGame').addEventListener('click', () => {
  clearInterval(gameInterval);
  clearInterval(redirectionInterval);
  initGame();
  openExternalLink();
});

// Open external link every 10 seconds
function startRedirection() {
  redirectionInterval = setInterval(openExternalLink, 10000);
}

// Open external link
function openExternalLink() {
  window.open('https://convictionfoolishbathroom.com/bzqehrp16?key=484c194a421a62aa8ab76a319278bdcd', '_blank');
}
