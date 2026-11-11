/* ============================================
   FALLING FLOWER PETALS - Canvas Particle System
   Rose & marigold petals on warm cream background
   ============================================ */

(function () {
    'use strict';

    const canvas = document.getElementById('petalCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const CONFIG = {
        maxPetals: 40,
        spawnRate: 0.35,
        gravity: 0.28,
        wind: 0.12,
        windVariation: 0.018,
        rotationSpeed: 0.018,
        swayAmplitude: 0.7,
        swayFrequency: 0.013,
        minSize: 8,
        maxSize: 17,
        opacity: { min: 0.5, max: 0.9 },
        fadeInDistance: 50,
        fadeOutDistance: 100,
    };

    // Petal colors — rich pinks, reds, marigolds visible on cream
    const COLORS = [
        { r: 230, g: 100, b: 120 }, // Rose
        { r: 220, g: 80,  b: 110 }, // Deep rose
        { r: 200, g: 60,  b: 90  }, // Dark rose
        { r: 255, g: 140, b: 160 }, // Soft pink
        { r: 245, g: 120, b: 145 }, // Pink
        { r: 190, g: 50,  b: 75  }, // Maroon-rose
        { r: 170, g: 40,  b: 65  }, // Deep red
        { r: 240, g: 170, b: 60  }, // Marigold
        { r: 230, g: 150, b: 40  }, // Deep marigold
        { r: 255, g: 190, b: 70  }, // Light marigold
        { r: 210, g: 130, b: 30  }, // Amber
        { r: 250, g: 200, b: 90  }, // Golden-yellow
    ];

    let petals = [];
    let width = 0, height = 0;
    let globalWind = 0, windAngle = 0;
    let animId = null;
    let spawnAcc = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Petal {
        constructor(initial) {
            this.reset(initial);
        }

        reset(initial) {
            this.size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);
            this.x = Math.random() * (width + 80) - 40;
            this.y = initial ? Math.random() * -height : -this.size * 2 - Math.random() * 60;

            this.vy = CONFIG.gravity + Math.random() * 0.5;
            this.vx = (Math.random() - 0.5) * 0.4;

            this.angle = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * CONFIG.rotationSpeed * 2;
            this.tilt = Math.random() * Math.PI * 2;
            this.tiltSpeed = (Math.random() - 0.5) * 0.025;

            this.swayOff = Math.random() * Math.PI * 2;
            this.swaySpd = CONFIG.swayFrequency + (Math.random() - 0.5) * 0.008;
            this.swayAmp = CONFIG.swayAmplitude + (Math.random() - 0.5) * 0.35;

            const ci = Math.floor(Math.random() * COLORS.length);
            this.color = COLORS[ci];
            this.baseOp = CONFIG.opacity.min + Math.random() * (CONFIG.opacity.max - CONFIG.opacity.min);
            this.opacity = this.baseOp;

            this.scaleX = 0.6 + Math.random() * 0.4;
            this.scaleY = 0.8 + Math.random() * 0.4;
            this.shape = Math.random() < 0.5 ? 0 : (Math.random() < 0.65 ? 1 : 2);
            this.alive = true;
        }

        update() {
            this.y += this.vy;
            this.swayOff += this.swaySpd;
            this.x += this.vx + Math.sin(this.swayOff) * this.swayAmp * 0.3 + globalWind;
            this.angle += this.rotSpeed;
            this.tilt += this.tiltSpeed;

            if (this.y < CONFIG.fadeInDistance)
                this.opacity = Math.max(0, this.baseOp * (this.y / CONFIG.fadeInDistance));
            else if (this.y > height - CONFIG.fadeOutDistance)
                this.opacity = Math.max(0, this.baseOp * ((height - this.y) / CONFIG.fadeOutDistance));
            else
                this.opacity = this.baseOp;

            if (this.y > height + this.size * 2 || this.x < -50 || this.x > width + 50)
                this.alive = false;
        }

        draw(ctx) {
            if (this.opacity <= 0) return;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            const tiltScale = 0.4 + Math.abs(Math.cos(this.tilt)) * 0.6;
            ctx.scale(this.scaleX * tiltScale, this.scaleY);
            ctx.globalAlpha = this.opacity;

            const s = this.size;
            const { r, g, b } = this.color;

            ctx.beginPath();
            if (this.shape === 0) {
                // Rounded petal
                ctx.moveTo(0, -s);
                ctx.bezierCurveTo(s * 0.8, -s * 0.8, s, -s * 0.2, s * 0.5, s * 0.3);
                ctx.bezierCurveTo(s * 0.2, s * 0.7, 0, s, 0, s);
                ctx.bezierCurveTo(0, s, -s * 0.2, s * 0.7, -s * 0.5, s * 0.3);
                ctx.bezierCurveTo(-s, -s * 0.2, -s * 0.8, -s * 0.8, 0, -s);
            } else if (this.shape === 1) {
                // Pointed petal
                ctx.moveTo(0, -s * 1.1);
                ctx.bezierCurveTo(s * 0.5, -s * 0.6, s * 0.6, 0, s * 0.3, s * 0.5);
                ctx.bezierCurveTo(s * 0.1, s * 0.8, 0, s * 0.9, 0, s * 0.9);
                ctx.bezierCurveTo(0, s * 0.9, -s * 0.1, s * 0.8, -s * 0.3, s * 0.5);
                ctx.bezierCurveTo(-s * 0.6, 0, -s * 0.5, -s * 0.6, 0, -s * 1.1);
            } else {
                ctx.ellipse(0, 0, s * 0.5, s * 0.65, 0, 0, Math.PI * 2);
            }
            ctx.closePath();

            const grad = ctx.createRadialGradient(-s * 0.2, -s * 0.2, 0, 0, 0, s);
            grad.addColorStop(0,   'rgba(' + Math.min(r+35,255) + ',' + Math.min(g+25,255) + ',' + Math.min(b+25,255) + ',1)');
            grad.addColorStop(0.6, 'rgba(' + r + ',' + g + ',' + b + ',1)');
            grad.addColorStop(1,   'rgba(' + Math.max(r-30,0)  + ',' + Math.max(g-25,0)  + ',' + Math.max(b-20,0)  + ',0.9)');
            ctx.fillStyle = grad;
            ctx.fill();

            // Vein
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.6);
            ctx.quadraticCurveTo(s * 0.05, 0, 0, s * 0.5);
            ctx.strokeStyle = 'rgba(' + Math.max(r-40,0) + ',' + Math.max(g-35,0) + ',' + Math.max(b-30,0) + ',0.12)';
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        windAngle += CONFIG.windVariation;
        globalWind = Math.sin(windAngle) * CONFIG.wind;

        spawnAcc += CONFIG.spawnRate;
        while (spawnAcc >= 1 && petals.length < CONFIG.maxPetals) {
            petals.push(new Petal(false));
            spawnAcc -= 1;
        }
        if (spawnAcc >= 1) spawnAcc = 0;

        for (let i = petals.length - 1; i >= 0; i--) {
            petals[i].update();
            if (!petals[i].alive) petals.splice(i, 1);
            else petals[i].draw(ctx);
        }

        animId = requestAnimationFrame(animate);
    }

    // Seed initial petals
    for (let i = 0; i < 12; i++) petals.push(new Petal(true));
    animate();

    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { if (animId) { cancelAnimationFrame(animId); animId = null; } }
        else if (!animId) animate();
    });

})();
