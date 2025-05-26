export default function formatModifier(modifier: number): string {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`
}