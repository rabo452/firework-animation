import randInt from "./randInt.js";
import randColor from "./randColor.js";
import Explosion from "./Explosion.js";

// don't update the position of firework outside this class
export default class FireWork {
    
    constructor() {
        this.props = {
            x: randInt(window.innerWidth * .5, window.innerWidth * .6), // start x
            y: window.innerHeight + 30, // start y
            deltaX: randInt(-2.3, 2.3), // change of x after rerender of screen
            deltaY: -3, // change of y after rerender of screen
            color: randColor(), // color of firework
            radius: 3,
            prevPositions: [], // contains x, y object of previous coords
            // from this y will be counted the trajectory start y and explosion y
            minY: window.innerHeight - (window.innerHeight * randInt(75, 85)) / 100,
            reachedTrajectory: false, // reached y property the moment then need to make trajectory
        }

        // it should not be zero
        while (this.props.deltaX === 0) {
            this.props.deltaX = randInt(-2, 2);
        }

        // after the firework reaches this point it make his speed slower to make the arc trajectory
        // after that it'll start falling
        this.props.trajectoryStartY = this.props.minY + 5;
        
        // the firework before the explode should make the arc trajectory
        // so it reach the maxY value after that it's falling
        // and after some time it's explode
        this.props.explosionY = this.props.minY + 10;
    }

    
    updatePosition() {
        // save previous position of firework
        this.props.prevPositions.push({
            x: this.props.x,
            y: this.props.y
        });

        this.props.x += this.props.deltaX;
        this.props.y += this.props.deltaY;
    }
    
    readyToStartTrajectory() {
        // make slower speed
        if (this.props.y <= this.props.trajectoryStartY && !this.props.reachedTrajectory) {
            this.props.reachedTrajectory = true;
            return true;
        }

        // if it's reached the trajectory start y then make slower speed of firework
        if (this.props.reachedTrajectory) {
            this.props.deltaY += .04;

            if (this.props.deltaX < 0) {
                this.props.deltaX += .005;
            } else {
                this.props.deltaX -= .005;
            }

            return true;
        }

        return false;
    }

    readyForExplosion() {
        return (this.props.y >= this.props.explosionY && this.props.reachedTrajectory);
    }

    // return explosion obj that depends on this object
    createExplosionObj() {
        return new Explosion(this.props.x, this.props.y, this.props.color, this.props.radius);
    }
}