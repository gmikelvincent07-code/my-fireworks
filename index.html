<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fireworks</title>
    <style>
        body { margin: 0; background-color: #000; overflow: hidden; }
        canvas { display: block; }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let name = prompt("Who do you miss?");
        if (!name) name = "Someone Special";

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        class Particle {
            constructor(x, y, color, velocityX, velocityY) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.velocity = { x: velocityX, y: velocityY };
                this.alpha = 1;
                this.friction = 0.96; // Keeps the trails long but moving
                this.gravity = 0.15;  // Pulls them down slightly for realism
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10; // Adds that "glow" look from your video
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.velocity.x *= this.friction;
                this.velocity.y *= this.friction;
                this.velocity.y += this.gravity;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= 0.012; // Controls how fast the trail itself dies
            }
        }

        function createFirework(x, y) {
            const count = 80;
            const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2) / count * i;
                const speed = Math.random() * 5 + 2;
                particles.push(new Particle(x, y, color, Math.cos(angle) * speed, Math.sin(angle) * speed));
            }
        }

        function render() {
            // CRITICAL: This low alpha (0.1) creates the trailing effect
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

            // Randomly showing the text during fireworks
            if (Math.random() < 0.05 && particles.length > 0) {
                ctx.fillStyle = "white";
                ctx.font = "bold 30px Arial";
                ctx.textAlign = "center";
                ctx.fillText("I MISS YOU", canvas.width / 2, canvas.height / 2 - 20);
                ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height / 2 + 20);
            }

            requestAnimationFrame(render);
        }

        window.addEventListener('click', (e) => {
            createFirework(e.clientX, e.clientY);
        });

        // Auto-launch first one
        setTimeout(() => createFirework(canvas.width/2, canvas.height/3), 1000);

        render();
    </script>
</body>
</html>
