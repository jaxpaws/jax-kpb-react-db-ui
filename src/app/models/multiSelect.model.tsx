export default interface MultiSelectModel {
    label: string,
    multiSelectName: string,
    options: string,
    descriptionText?: string,
    isRequired?: boolean,
    orientation?: 'flex-col' | 'grid',
    selectedValuesMap?: Map<string, any>,
    handleChange?: (event: any) => void
}