export default function getModifier(score: number): number {
    return Math.floor((score - 10) / 2);
}

 