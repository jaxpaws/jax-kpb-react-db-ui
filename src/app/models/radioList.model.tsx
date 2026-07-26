export default interface RadioListModel {
    label: string,
    listName: string,
    options: string,
    descriptionText?: string,
    isRequired?: boolean,
    selectedValue?: string,
    handleChange?: (event: any) => void
}