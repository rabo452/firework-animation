export default class ExplosionCircle {

    constructor(startX, startY, deltaX, deltaY, color) {
        this.props = {
            x: startX,
            y: startY,
            deltaX,
            deltaY,
            color
        }
    }

    updatePosition() {
        this.props.x += this.props.deltaX;
        this.props.y += this.props.deltaY;
    }
}