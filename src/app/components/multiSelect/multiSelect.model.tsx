export interface MultiSelectModel {
    label: string,
    multiSelectName: string,
    options: string,
    descriptionText?: string,
    isRequired?: boolean,
    hasSearch?: boolean,
    orientation?: 'flex-col' | 'grid',
    selectedValuesMap?: Map<string, any>,
    errorText?: string,
    handleChange?: (event: any) => void
}