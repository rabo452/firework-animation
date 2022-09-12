import randInt from "./randInt.js";

export default function randColor() {
    return {
        red: randInt(127, 255),
        green: randInt(127,255),
        blue: randInt(127, 255)
    }
}