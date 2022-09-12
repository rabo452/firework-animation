export default function randInt(min, max) {
    if (min > max) throw new Error("minimum value can't be more than maximum value!");

    return (Math.random() * (max - min) + min);
}