export default interface ComboBoxModel {
    label: string,
    searchInputId: string,
    listboxId: string,
    buttonId: string,
    listAriaLabel?: string,
    options: string,
    autocomplete?: 'none' | 'list' | 'both'
}