export default function isBlank(str: string | undefined | null) {
    return (!str || str === '');
}