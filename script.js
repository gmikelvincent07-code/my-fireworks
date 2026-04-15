const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');

// Make canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the name from the user
const name = prompt("Enter a name for the fireworks:");

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // This creates the "trail" effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Logic to draw "I MISS YOU" and the Name
    ctx.fillStyle = 'cyan';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("I MISS YOU", canvas.width / 2, canvas.height / 2 - 40);
    
    ctx.fillStyle = 'magenta';
    ctx.fillText(name ? name.toUpperCase() : "YOU", canvas.width / 2, canvas.height / 2 + 20);

    requestAnimationFrame(animate);
}

animate();
