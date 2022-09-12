import randInt from "./randInt.js";
import ExplosionCircle from "./ExplosionCircle.js";

// firework explosed
export default class Explosion {
    
    constructor(centerX, centerY, color, radius) {
        this.props = {
            x: centerX,
            y: centerY,
            color,
            lineWidth: 7,
            circles: [], // explosion circles arr
            framesBeforeDisappear: randInt(70, 100),
            radius // circle radius
        }
        this.props.color.transparent = 1;
        // copy the value 
        this.props.framesBeforeDisappearStart = this.props.framesBeforeDisappear;

        // east - west, north - south
        this.props.circles.push(new ExplosionCircle(centerX, centerY, 0, -2, color));
        this.props.circles.push(new ExplosionCircle(centerX, centerY, -2, 0, color));
        this.props.circles.push(new ExplosionCircle(centerX, centerY, 2, 0, color));
        this.props.circles.push(new ExplosionCircle(centerX, centerY, 0, 2, color));

        this.props.circles.push(new ExplosionCircle(centerX, centerY, -1.5, -2, color));
        this.props.circles.push(new ExplosionCircle(centerX, centerY, 1.5, -2, color));
        this.props.circles.push(new ExplosionCircle(centerX, centerY, 1.5, 2, color));
        this.props.circles.push(new ExplosionCircle(centerX, centerY, -1.5, 2, color));

        // random circles
        for (var i=0; i < randInt(6, 14); i++) {
            this.props.circles.push(new ExplosionCircle(centerX, centerY, randInt(-2, 2), randInt(-2, 2), color));
        }
    }

    // change the transparent of color that depends on the frames before disappear
    // check this in procent
    changeTransparent() {
        var disappearProcent = this.props.framesBeforeDisappear / this.props.framesBeforeDisappearStart;
        this.props.color.transparent = disappearProcent;
    }

    readyToDisappear() {
        return this.props.framesBeforeDisappear === 0;
    }

    // update circles position of explosion
    updatePosition() {
        for (var lineObj of this.props.circles) {
            lineObj.updatePosition();
        }

        this.props.framesBeforeDisappear--;
    }

    // need to show in the center of explosion the circle
    needToShowCenterCircle() {
        return this.props.framesBeforeDisappear / this.props.framesBeforeDisappearStart >= .9; 
    }
}