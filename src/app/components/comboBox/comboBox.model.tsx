export interface ComboBoxModel {
    label: string;
    descriptionText?: string;
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
    addOptionBtn?: React.ReactNode;
}