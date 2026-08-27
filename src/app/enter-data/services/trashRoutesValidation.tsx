import { TrashRoutesEventModel } from '../../models/event';
import { ErrorModel } from '../../models';
import { TRASH_ROUTES_FORM_DATA_IDS } from './servicesJson';
import { validateDate, validatePounds } from '../../utils/commonFormValidation';
import { UNSIGNED_SMALL_INT_MAX } from '../../constValues';

export async function validateTrashRoutesData(
    formData: FormData
): Promise<{ data: TrashRoutesEventModel | null, errors: Map<string, ErrorModel> }> {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();

    const dateValidation = validateDate(errors, formData.get(TRASH_ROUTES_FORM_DATA_IDS.date), TRASH_ROUTES_FORM_DATA_IDS.date);
    errors = dateValidation.errors;

    const trashValidation = validatePounds(
        errors,
        formData.get(TRASH_ROUTES_FORM_DATA_IDS.trashPounds),
        TRASH_ROUTES_FORM_DATA_IDS.trashPounds,
        'Pounds of Trash Collected',
        UNSIGNED_SMALL_INT_MAX,
        true
    );
    errors = trashValidation.errors;

    const recyclingValidation = validatePounds(
        errors,
        formData.get(TRASH_ROUTES_FORM_DATA_IDS.recyclingPounds),
        TRASH_ROUTES_FORM_DATA_IDS.recyclingPounds,
        'Pounds of Recycling Collected',
        UNSIGNED_SMALL_INT_MAX,
        true
    );
    errors = recyclingValidation.errors;

    let data: TrashRoutesEventModel | null = null;
    if (errors.size === 0 && dateValidation.date &&
        (trashValidation.pounds || trashValidation.pounds === 0) &&
        (recyclingValidation.pounds || recyclingValidation.pounds === 0)
    ) {
        data = {
            date: dateValidation.date,
            trashPounds: trashValidation.pounds,
            recyclingPounds: recyclingValidation.pounds
        };
    }
    return { data: data, errors: errors };
}