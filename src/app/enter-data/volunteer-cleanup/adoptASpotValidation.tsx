import { AdoptASpotEventModel, AdoptASpotGroupModel, ErrorModel } from '../../models';
import { ADOPT_A_SPOT_FORM_DATA_IDS } from './volunteerCleanupJson';
import { 
    isFormDataEntryValueNullOrBlank,
    validateComboBox,
    validateDate,
    validatePounds,
    validateCount
} from '../../utils/commonFormValidation';
import { DECIMAL_3_DOT_2_MAX, UNSIGNED_TINY_INT_MAX, UNSIGNED_SMALL_INT_MAX } from '../../constValues';
import { AdoptASpotGroupDAO } from '../../dao/group';

export async function validateAdoptASpotData(
    formData: FormData, selectedSpot: string
): Promise<{ data: AdoptASpotEventModel | null, errors: Map<string, ErrorModel> }> {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();

    const dateValidation = validateDate(errors, formData.get(ADOPT_A_SPOT_FORM_DATA_IDS.date), ADOPT_A_SPOT_FORM_DATA_IDS.date);
    errors = dateValidation.errors;

    const spotValidation = await validateComboBox(
        errors,
        selectedSpot,
        `${ADOPT_A_SPOT_FORM_DATA_IDS.spot}-input`,
        'Adopt-a-Spot Spot',
        'spot',
        new AdoptASpotGroupDAO()
    );
    if (spotValidation.selection) {
        spotValidation.selection = {
            id: Number(selectedSpot.trim()),
            name: spotValidation.selection.name,
            location: spotValidation.selection.location
        };
    }
    errors = spotValidation.errors;

    const volunteerCountValidation = validateCount(
        errors,
        formData.get(ADOPT_A_SPOT_FORM_DATA_IDS.volunteerCount),
        ADOPT_A_SPOT_FORM_DATA_IDS.volunteerCount,
        'Number of Volunteers',
        UNSIGNED_TINY_INT_MAX,
        'count',
        false
    );
    errors = volunteerCountValidation.errors;

    const volunteerHoursValidation = validateCount(
        errors,
        formData.get(ADOPT_A_SPOT_FORM_DATA_IDS.volunteerHours),
        ADOPT_A_SPOT_FORM_DATA_IDS.volunteerHours,
        'Volunteer Hours',
        DECIMAL_3_DOT_2_MAX,
        'hours',
        false,
        2
    );
    errors = volunteerHoursValidation.errors;

    const litterValidation = validatePounds(
        errors,
        formData.get(ADOPT_A_SPOT_FORM_DATA_IDS.litterCollected),
        ADOPT_A_SPOT_FORM_DATA_IDS.litterCollected,
        'Pounds of Litter Collected',
        UNSIGNED_SMALL_INT_MAX,
        true
    );
    errors = litterValidation.errors;

    const recyclingValidation = validatePounds(
        errors,
        formData.get(ADOPT_A_SPOT_FORM_DATA_IDS.recyclingCollected),
        ADOPT_A_SPOT_FORM_DATA_IDS.recyclingCollected,
        'Pounds of Recycling Collected',
        UNSIGNED_SMALL_INT_MAX,
        true
    );
    errors = recyclingValidation.errors;

    let data: AdoptASpotEventModel | null = null;
    if (errors.size === 0 && dateValidation.date &&
        spotValidation.selection &&
        volunteerCountValidation.count &&
        volunteerHoursValidation.count &&
        litterValidation.pounds &&
        (recyclingValidation.pounds || recyclingValidation.pounds === 0)
    ) {
        data = {
            date: dateValidation.date,
            spot: spotValidation.selection,
            volunteerCount: volunteerCountValidation.count,
            volunteerHours: volunteerHoursValidation.count,
            litterCollected: litterValidation.pounds,
            recyclingCollected: recyclingValidation.pounds
        };
    }
    return { data: data, errors: errors };
}