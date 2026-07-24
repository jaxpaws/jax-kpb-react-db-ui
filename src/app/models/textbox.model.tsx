export default interface TextboxModel {
    inputId: string,
    inputType: string,
    inputName?: string,
    labelText: string,
    descriptionText?: string,
    maxlength?: number,
    width?: string,
    isRequired?: boolean,
    labelFontWeight?: number,
    errorText?: string
}