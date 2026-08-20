import { isBlank } from './isBlank';
import { UNSIGNED_SMALL_INT_MAX } from '../constValues';
import { BulkyItemModel, ErrorModel, ReferenceDataModel } from '../models';
import { BulkyItemReferenceDataDAO } from '../dao/referenceData';

export function isFormDataEntryValueNullOrBlank(value: FormDataEntryValue | null): boolean {
    return value === null || isBlank(value.toString());
}

export function isFormDataEntryValueArrayNullOrEmpty(valueArray: FormDataEntryValue[]): boolean {
    return valueArray === null || valueArray.length === 0;
}

export function validateDate(
    errors: Map<string, ErrorModel>,
    value: FormDataEntryValue | null,
    inputId: string
): { date: Date | null, errors: Map<string, ErrorModel> } {
    if (isFormDataEntryValueNullOrBlank(value)) {
        const error: ErrorModel = {
            inputId: inputId,
            fieldName: 'Date',
            message: 'Please enter a date'
        };
        errors.set(inputId, error);
    } else {
        const dateString: string | undefined = value?.toString();
        const dateAsTimestamp: number = Date.parse(dateString ? dateString : '');
        if (Number.isNaN(dateAsTimestamp)) {
            const error: ErrorModel = {
                inputId: inputId,
                fieldName: 'Date',
                message: `Wrong format, please use this format: 'yyyy-mm-dd'`
            };
            errors.set(inputId, error);
        } else {
            if (dateAsTimestamp > Date.now()) {
                const error: ErrorModel = {
                    inputId: inputId,
                    fieldName: 'Date',
                    message: `Cannot be a future date, please enter today's date or a past date`
                };
                errors.set(inputId, error);
            } else {
                return { date: new Date(dateAsTimestamp), errors: errors };
            }
        }
    }
    return { date: null, errors: errors };
}

export function validatePounds(
    errors: Map<string, ErrorModel>,
    value: FormDataEntryValue | null,
    inputId: string,
    poundsOfWhat: string
): { pounds: number | null, errors: Map<string, ErrorModel> } {
    if (isFormDataEntryValueNullOrBlank(value)) {
        const error: ErrorModel = {
            inputId: inputId,
            fieldName: `Pounds of ${poundsOfWhat} Collected`,
            message: `Please enter the pounds collected`
        };
        errors.set(inputId, error);
    } else {
        const litterPoundsString: string | undefined = value?.toString();
        if (Number.isNaN(Number(litterPoundsString))) {
            const error: ErrorModel = {
                inputId: inputId,
                fieldName: `Pounds of ${poundsOfWhat} Collected`,
                message: 'Please enter the pounds collected'
            };
            errors.set(inputId, error);
        } else {
            const litterPounds: number = Number(litterPoundsString);
            if (litterPounds < 0 || litterPounds > UNSIGNED_SMALL_INT_MAX) {
                const error: ErrorModel = {
                    inputId: inputId,
                    fieldName: `Pounds of ${poundsOfWhat} Collected`,
                    message: `Please enter a number greater than 0 and less than ${UNSIGNED_SMALL_INT_MAX}`
                };
                errors.set(inputId, error);
            } else {
                return { pounds: Number(litterPoundsString), errors: errors };
            }
        }
    }
    return { pounds: null, errors: errors };
}

export function validateSimpleTextField(
    errors: Map<string, ErrorModel>,
    value: FormDataEntryValue | null,
    inputId: string,
    fieldDescription: string,
    maxLength: number
): { text: string | null, errors: Map<string, ErrorModel> } {
    if (isFormDataEntryValueNullOrBlank(value)) {
        const error: ErrorModel = {
            inputId: inputId,
            fieldName: fieldDescription,
            message: `Please enter the ${fieldDescription}`
        };
        errors.set(inputId, error);
    } else if (`${value}`.length > maxLength) {
        const error: ErrorModel = {
            inputId: inputId,
            fieldName: fieldDescription,
            message: `Please reduce the character count by at least ${`${value}`.length - maxLength} characters`
        };
        errors.set(inputId, error);
    } else {
        return { text: `${value}`, errors: errors };
    }
    return { text: null, errors: errors };
}

export async function validateBulkyItems(
    errors: Map<string, ErrorModel>, formData: FormData, selectedBulkyItemValues: string[], inputId: string, searchId?: string
): Promise<{ bulkyItems: BulkyItemModel[] | null, errors: Map<string, ErrorModel> }> {
    let quantityErrors: ErrorModel[] = [];
    let quantityField: FormDataEntryValue | null;
    const startingErrorCount: number = errors.size;
    let validBulkyItems: BulkyItemModel[] = [];
    const selectedBulkyItems: FormDataEntryValue[] = formData.getAll(inputId);
    if (isFormDataEntryValueArrayNullOrEmpty(selectedBulkyItemValues)) {
        const error: ErrorModel = {
            inputId: searchId ? searchId : `${inputId}-1`,
            fieldName: 'Bulky Items Collected',
            message: 'Please select at least one bulky item'
        };
        errors.set(inputId, error);
    } else {
        const bulkyItemRefDataDAO: BulkyItemReferenceDataDAO = new BulkyItemReferenceDataDAO();
        const bulkyItems: ReferenceDataModel[] = await bulkyItemRefDataDAO.getAll();
        if (bulkyItems && bulkyItems.length >= 1) {
            const bulkyItemsMap = new Map<string, string>();
            bulkyItems.map((item: ReferenceDataModel) => bulkyItemsMap.set(`${item.code}`, item.description ? item.description : ''));
            
            selectedBulkyItemValues.map((value: FormDataEntryValue) => {
                const [itemLabel, itemId] = value.toString().trim().split('|');
                if (!bulkyItemsMap.has(itemId)) {
                    const error: ErrorModel = {
                        inputId: searchId ? searchId : `${inputId}-1`,
                        fieldName: 'Bulky Items Collected',
                        message: `Invalid bulky item selected with id: '${itemId}'`
                    };
                    errors.set(inputId, error);
                }
                quantityField = formData.get(`bulky-item-${itemId}-quantity`);
                if (isFormDataEntryValueNullOrBlank(quantityField)) {
                    quantityErrors.push({
                        inputId: `bulky-item-${itemId}-quantity`,
                        fieldName: `${itemLabel} Quantity`,
                        message: `Please enter the quantity`
                    });
                } else {
                    const quantityString: string = quantityField ? quantityField.toString().trim() : '0';
                    if (Number.isNaN(Number(quantityString))) {
                        quantityErrors.push({
                            inputId: `bulky-item-${itemId}-quantity`,
                            fieldName: `${itemLabel} Quantity`,
                            message: `Please enter only digits`
                        });
                    } else {
                        const quantity: number = Number(quantityString);
                        if (quantity < 0 || quantity > UNSIGNED_SMALL_INT_MAX) {
                            quantityErrors.push({
                                inputId: `bulky-item-${itemId}-quantity`,
                                fieldName: `${itemLabel} Quantity`,
                                message: `Please enter a number greater than 0 and less than ${UNSIGNED_SMALL_INT_MAX}`
                            });
                        } else {
                            validBulkyItems.push({ bulkyItemRef: { code: itemId, description: '' }, quantity: quantity });
                        }
                    }
                }
            });
            quantityErrors.map((error: ErrorModel) => errors.set(
                error.inputId,
                { inputId: error.inputId, fieldName: error.fieldName, message: error.message }
            ));
        }
    }
    if (errors.size > startingErrorCount) {
        return { bulkyItems: null, errors: errors };
    } else {
        return { bulkyItems: validBulkyItems, errors: errors };
    }
}