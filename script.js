const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const msg = document.getElementById('message');
const hint = document.getElementById('hint');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 12,
            y: (Math.random() - 0.5) * 12
        };
        this.alpha = 1;
        this.friction = 0.95;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015;
    }
}

function createFirework(x, y) {
    const colors = ['#ff4d6d', '#00f5d4', '#fee440', '#9b5de5'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 40; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        if (p.alpha > 0) {
            p.update();
            p.draw();
        } else {
            particles.splice(i, 1);
        }
    });
}

// The "Click to Work" logic
window.addEventListener('mousedown', (e) => {
    createFirework(e.clientX, e.clientY);
    msg.style.opacity = '1';
    hint.style.opacity = '0';
});

window.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    createFirework(t.clientX, t.clientY);
    msg.style.opacity = '1';
    hint.style.opacity = '0';
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
