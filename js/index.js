// show canvas animation fireworks in the screen
import randInt from "./randInt.js";
import FireWork from "./FireWork.js";

var canvasBlock = document.querySelector('#canvas');
var intervalMillSec = 3000;
canvasBlock.width = window.innerWidth;
canvasBlock.height = window.innerHeight;


// create the random fireworks in random position
class FireworkAnimation {
    fireworks = []; // arr of firework objects
    explosions = []; // arr of explosion objects

    constructor() {
        this._ctx = canvasBlock.getContext('2d');
        
        // create first n firework objects
        for (var i = 0; i < 2; i++) {
            this.fireworks.push(new FireWork());
        }

        // after start of animation create 1 more through pause
        setTimeout(() => this.fireworks.push(new FireWork()), 400);
    }

    clearCanvas() {
        this._ctx.clearRect(0, 0, canvasBlock.width, canvasBlock.height);
    }

    // render new frame on the screen
    // update the fireworks pos and continue animation of explosions
    createFrame() {
        for (var firework of this.fireworks) {
            firework.updatePosition();
            firework.readyToStartTrajectory();

            // create new explosion object if it's ready to explode
            if (firework.readyForExplosion()) {
                this.explosions.push(firework.createExplosionObj());
                this.removeFirework(firework);
                continue;
            }

            this.paintFirework(firework);
        }

        for (var explosion of this.explosions) {
            explosion.updatePosition();
            explosion.changeTransparent();

            if (explosion.readyToDisappear()) {
                this.removeExplosion(explosion);
                continue;
            }

            this.paintExplosion(explosion);
        }
    }
    
    removeExplosion(explosionObj) {
        var index = 0;
        for (var explosion of this.explosions) {
            if (explosion == explosionObj) {
                this.explosions.splice(index, 1);
                return;
            }
            index++;
        }
    }

    // remove need firework object from fireworks
    removeFirework(fireworkObj) {
        var index = 0;
        for (var firework of this.fireworks) {
            if (firework == fireworkObj) {
                this.fireworks.splice(index, 1);
                return;
            }
            index++;
        }
    }
    
    paintFirework(fireworkObj) {
        var color = fireworkObj.props.color;
        var radius = fireworkObj.props.radius;
        
        var prevPositions = fireworkObj.props.prevPositions.slice();
        // get last prev positions and paint it with transparent color
        if (prevPositions.length != 0) {
            prevPositions.reverse();
            prevPositions.splice(8);

            prevPositions.forEach((position, index) => {
                if (index % 2 == 1) return;

                this._ctx.beginPath();
                this._ctx.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue}, ${1 - ((index + 1) / prevPositions.length)})`;
                this._ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
                this._ctx.fill();
            });
        }
    
        this._ctx.beginPath();
        this._ctx.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        this._ctx.arc(fireworkObj.props.x, fireworkObj.props.y, radius, 0, Math.PI * 2);
        this._ctx.fill();
    }

    paintExplosion(explosionObj) {
        var color = explosionObj.props.color;
        var radius = explosionObj.props.radius;
        this._ctx.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue}, ${color.transparent}`;

        // need to paint the center circle or not
        if (explosionObj.needToShowCenterCircle()) {
            this._ctx.beginPath();
            this._ctx.arc(explosionObj.props.x, explosionObj.props.y, radius, 0, Math.PI * 2);
            this._ctx.fill();
        }
        
        for (var circle of explosionObj.props.circles) {
            this._ctx.beginPath();
            this._ctx.arc(circle.props.x, circle.props.y, radius, 0, Math.PI * 2);
            this._ctx.fill();
        }
    }
}

var animationObj = new FireworkAnimation();
requestAnimationFrame(animate);
var interval = setInterval(intervalFunc, intervalMillSec);  // each interval create new firework obj
// change canvas block width, height
// reload animation
window.onresize = windowResizeFunc;

function animate() {
    requestAnimationFrame(animate);

    animationObj.clearCanvas(); 
    animationObj.createFrame();
}

function intervalFunc() {
    for (var i = 0; i < Math.round(randInt(2, 4)); i++) {
        animationObj.fireworks.push(new FireWork());
    }
}

function windowResizeFunc() {
    canvasBlock.width = window.innerWidth;
    canvasBlock.height = window.innerHeight;
    animationObj.clearCanvas();
    animationObj = new FireworkAnimation();
    
    // start new interval if resized
    clearInterval(interval);
    interval = setInterval(intervalFunc, intervalMillSec);
}