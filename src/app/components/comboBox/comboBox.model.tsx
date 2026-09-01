export interface ComboBoxModel {
    label: string;
    searchInputId: string;
    listboxId: string;
    buttonId: string;
    value?: string;
    listAriaLabel?: string;
    options: string;
    isRequired: boolean;
    autocomplete?: 'none' | 'list' | 'both';
    errorText?: string;
    handleChange?: (value: string) => void;
}