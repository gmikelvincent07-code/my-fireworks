const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const targetName = prompt("Who do you miss?", "Andrea");
let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.95;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text Display
    ctx.globalAlpha = 1;
    ctx.font = "bold 35px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "cyan";
    ctx.fillText("I MISS YOU", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillStyle = "magenta";
    ctx.fillText(targetName.toUpperCase(), canvas.width / 2, canvas.height / 2 + 30);

    particles.forEach((p, i) => {
        if (p.alpha > 0) {
            p.update();
            p.draw();
        } else {
            particles.splice(i, 1);
        }
    });

    if (Math.random() < 0.05) createFirework();
}

animate();
