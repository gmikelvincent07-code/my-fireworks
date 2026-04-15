const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const targetName = prompt("Who do you miss?", "ANDREA").toUpperCase();
let particles = [];

// 1. Function to get pixel coordinates for the text
function getTextMatrix(text) {
    const matrix = [];
    ctx.font = "bold 20px monospace"; // Monospace for pixel look
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Scan the canvas for "lit" pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let y = 0; y < canvas.height; y += 6) { // 6 is the pixel size
        for (let x = 0; x < canvas.width; x += 6) {
            const index = (y * canvas.width + x) * 4;
            if (imageData[index + 3] > 128) { // If pixel is not transparent
                matrix.push({ x, y });
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return matrix;
}

const nameCoords = getTextMatrix(targetName);

class Particle {
    constructor(startX, startY, targetX, targetY, color) {
        this.x = startX;
        this.y = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = color;
        this.alpha = 1;
        this.speed = 0.08; // How fast they snap to the name
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        // Draw a small square for the pixel look
        ctx.fillRect(this.x, this.y, 4, 4);
    }

    update() {
        // Move towards the target pixel position
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
        
        // Slowly fade out after reaching target
        if (Math.abs(this.x - this.targetX) < 1) {
            this.alpha -= 0.005;
        }
    }
}

// 2. Trigger firework on CLICK
window.addEventListener('click', (e) => {
    const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    
    // Create a particle for every "pixel" in the name
    nameCoords.forEach(coord => {
        particles.push(new Particle(e.clientX, e.clientY, coord.x, coord.y, color));
    });
});

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
    });

    // Add a little instruction text
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "white";
    ctx.font = "12px monospace";
    ctx.fillText("TAP ANYWHERE", canvas.width / 2, 30);

    requestAnimationFrame(animate);
}

animate();
