export default interface CheckboxModel {
    inputId: string,
    inputName?: string,
    label: string,
    value: string,
    isChecked?: boolean,
    handleChange?: (event: any) => void
}