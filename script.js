const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let text = "";
let started = false;

function start() {
  text = document.getElementById("textInput").value || "I MISS YOU";
  document.getElementById("ui").style.display = "none";
  started = true;
  createTextParticles();
}

function createTextParticles() {
  const tempCanvas = document.createElement("canvas");
  const tctx = tempCanvas.getContext("2d");

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  tctx.fillStyle = "white";
  tctx.font = "bold 80px Arial";
  tctx.textAlign = "center";
  tctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = tctx.getImageData(0, 0, canvas.width, canvas.height).data;

  for (let y = 0; y < canvas.height; y += 6) {
    for (let x = 0; x < canvas.width; x += 6) {
      const index = (y * canvas.width + x) * 4;
      if (imageData[index + 3] > 128) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height,
          targetX: x,
          targetY: y,
          vx: (Math.random() - 0.5) * 10,
          vy: Math.random() * -10,
          size: 2
        });
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!started) return;

  particles.forEach(p => {
    // move toward text position
    p.x += (p.targetX - p.x) * 0.05;
    p.y += (p.targetY - p.y) * 0.05;

    ctx.fillStyle = "gold";
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
}

animate();
