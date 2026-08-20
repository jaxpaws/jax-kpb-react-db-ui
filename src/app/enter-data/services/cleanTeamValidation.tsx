import { CleanTeamModel, ErrorModel } from '../../models';
import { CLEAN_TEAM_FORM_DATA_IDS } from './servicesJson';
import { validateDate, validatePounds, validateSimpleTextField } from '../../utils/commonFormValidation';
import { UNSIGNED_SMALL_INT_MAX } from '../../constValues';

const MAX_CLEAN_TEAM_EVENT_DESC_LENGTH: number = 70;

export async function validateCleanTeamData(
    formData: FormData
): Promise<{ data: CleanTeamModel | null, errors: Map<string, ErrorModel> }> {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();

    const dateValidation = validateDate(errors, formData.get(CLEAN_TEAM_FORM_DATA_IDS.date), CLEAN_TEAM_FORM_DATA_IDS.date);
    errors = dateValidation.errors;

    const trashValidation = validatePounds(
        errors,
        formData.get(CLEAN_TEAM_FORM_DATA_IDS.trashPounds),
        CLEAN_TEAM_FORM_DATA_IDS.trashPounds,
        'Pounds of Trash Collected',
        UNSIGNED_SMALL_INT_MAX,
        true
    );
    errors = trashValidation.errors;

    const recyclingValidation = validatePounds(
        errors,
        formData.get(CLEAN_TEAM_FORM_DATA_IDS.recyclingPounds),
        CLEAN_TEAM_FORM_DATA_IDS.recyclingPounds,
        'Pounds of Recycling Collected',
        UNSIGNED_SMALL_INT_MAX,
        true
    );
    errors = recyclingValidation.errors;

    const eventDescValidation = validateSimpleTextField(
        errors,
        formData.get(CLEAN_TEAM_FORM_DATA_IDS.description),
        CLEAN_TEAM_FORM_DATA_IDS.description,
        'Event Description',
        MAX_CLEAN_TEAM_EVENT_DESC_LENGTH
    );
    errors = eventDescValidation.errors;

    let data: CleanTeamModel | null = null;
    if (errors.size === 0 && dateValidation.date && eventDescValidation.text &&
        (trashValidation.pounds || trashValidation.pounds === 0) &&
        (recyclingValidation.pounds || recyclingValidation.pounds === 0)
    ) {
        data = {
            date: dateValidation.date,
            eventDescription: eventDescValidation.text,
            trashPounds: trashValidation.pounds,
            recyclingPounds: recyclingValidation.pounds
        };
    }
    return { data: data, errors: errors };
}