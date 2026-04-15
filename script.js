const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const targetName = prompt("Who do you miss?", "ANDREA").toUpperCase();
let rockets = [];
let particles = [];

class Rocket {
    constructor(targetX, targetY) {
        this.x = targetX;
        this.y = canvas.height;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 15;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            explode(this.x, this.y, this.color);
            return true; // Rocket reached target
        }
        return false;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 15);
        ctx.stroke();
    }
}

class Particle {
    constructor(x, y, targetX, targetY, color) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = color;
        this.alpha = 1;
        this.friction = 0.9;
        this.vx = (targetX - x) * 0.1;
        this.vy = (targetY - y) * 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2); // Long streaks
        ctx.stroke();
    }
}

function explode(x, y, color) {
    // Write text to a hidden canvas to get pixel data
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    
    offCtx.fillStyle = "white";
    offCtx.font = "bold 25px monospace";
    offCtx.textAlign = "center";
    offCtx.fillText("I MISS YOU", x, y - 20);
    offCtx.fillText(targetName, x, y + 20);

    const data = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 0; i < canvas.height; i += 6) {
        for (let j = 0; j < canvas.width; j += 6) {
            if (data[((i * canvas.width) + j) * 4 + 3] > 128) {
                particles.push(new Particle(x, y, j, i, color));
            }
        }
    }
}

window.addEventListener('mousedown', (e) => {
    rockets.push(new Rocket(e.clientX, e.clientY));
});

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rockets = rockets.filter(r => {
        r.draw();
        return !r.update();
    });

    particles = particles.filter(p => {
        p.update();
        p.draw();
        return p.alpha > 0;
    });

    requestAnimationFrame(animate);
}

animate();
