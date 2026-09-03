export function scrollToTopAndFocusAnElementById(anElementId: string, delayMs: number): void {
    setTimeout(() => {
        const anElement = document.getElementById(anElementId);
        if (anElement) {
            anElement.focus();
            window.scroll(0, 0);
        }
    }, delayMs);
}