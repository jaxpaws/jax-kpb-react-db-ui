const MONTHS: [number, string][] = [
    [1, 'January'],
    [2, 'February'],
    [3, 'March'],
    [4, 'April'],
    [5, 'May'],
    [6, 'June'],
    [7, 'July'],
    [8, 'August'],
    [9, 'September'],
    [10, 'October'],
    [11, 'November'],
    [12, 'December']
];
function getMonthText(monthNum: number): string {
    const monthTextValues: Map<number, string> = new Map<number, string>(MONTHS);
    if (monthTextValues.has(monthNum)) {
        let monthText: string | undefined = monthTextValues.get(monthNum);
        return monthText ? monthText : '';
    }
    return '';
}
export function getFormattedDate(date: string): string {
    const dateParts: string[] = date.split('-');
    return `${getMonthText(Number(dateParts[1]))} ${dateParts[2]}, ${dateParts[0]}`;
}