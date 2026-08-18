import { isBlank } from './isBlank';
import { UNSIGNED_SMALL_INT_MAX } from '../constValues';
import { ErrorModel } from '../models';

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
): Map<string, ErrorModel> {
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
            }
        }
    }
    return errors;
}

export function validatePounds(
    errors: Map<string, ErrorModel>,
    value: FormDataEntryValue | null,
    inputId: string,
    poundsOfWhat: string
): Map<string, ErrorModel> {
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
            }
        }
    }
    return errors;
}

export function validateSimpleTextField(
    errors: Map<string, ErrorModel>,
    value: FormDataEntryValue | null,
    inputId: string,
    fieldDescription: string,
    maxLength: number
): Map<string, ErrorModel> {
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
    }
    return errors;
}