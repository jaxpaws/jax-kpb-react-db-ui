export function isBlank(str: string | undefined | null) {
    return (!str || str.trim() === '');
}