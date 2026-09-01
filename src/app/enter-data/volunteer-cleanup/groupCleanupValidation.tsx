import { ErrorModel, ReferenceDataModel } from '../../models';
import { GroupCleanupEventModel } from '../../models/event';
import { GroupModel } from '../../models/group';
import { GroupEntity } from '../../entities/group/group.entity';
import { ReferenceDataEntity } from '../../entities/referenceData/referenceData.entity';
import {
    validateComboBox,
    validateDate,
    validatePounds,
    validateCount,
    validateSimpleTextField
} from '../../utils/commonFormValidation';
import { GROUP_CLEANUP_FORM_DATA_IDS } from './volunteerCleanupJson';
import { CleanupOrganizationGroupDAO } from '../../dao/group/cleanupOrganizationGroup.DAO';
import { CleanupLocationReferenceDataDAO } from '../../dao/referenceData/cleanupLocationReferenceData.DAO';
import { DECIMAL_4_DOT_2_MAX, UNSIGNED_SMALL_INT_MAX } from '../../constValues';

export async function validateGroupCleanupData(
    formData: FormData, selectedOrgId: string, selectedLocId: string
): Promise<{ data: GroupCleanupEventModel | null, errors: Map<string, ErrorModel> }> {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();
    
    const dateValidation = validateDate(errors, formData.get(GROUP_CLEANUP_FORM_DATA_IDS.date), GROUP_CLEANUP_FORM_DATA_IDS.date);
    errors = dateValidation.errors;

    const organizationValidation = await validateComboBox(
        errors,
        selectedOrgId,
        `${GROUP_CLEANUP_FORM_DATA_IDS.organization}-input`,
        'Organization',
        'organization',
        new CleanupOrganizationGroupDAO()
    );
    if (organizationValidation.selection && 'id' in organizationValidation.selection && 'name' in organizationValidation.selection) {
        const organization: GroupEntity = { id: organizationValidation.selection.id, name: organizationValidation.selection.name };
        organizationValidation.selection = organization;
    }
    errors = organizationValidation.errors;

    const locationValidation = await validateComboBox(
        errors,
        selectedLocId,
        `${GROUP_CLEANUP_FORM_DATA_IDS.location}-input`,
        'Cleanup Location',
        'location',
        new CleanupLocationReferenceDataDAO()
    );
    if (locationValidation.selection && 'code' in locationValidation.selection && 'description' in locationValidation.selection) {
        const location: ReferenceDataEntity = { code: locationValidation.selection.code, description: locationValidation.selection.description };
        locationValidation.selection = location;
    }
    errors = locationValidation.errors;

    const volunteerCountValidation = validateCount(
        errors,
        formData.get(GROUP_CLEANUP_FORM_DATA_IDS.volunteerCount),
        GROUP_CLEANUP_FORM_DATA_IDS.volunteerCount,
        'Number of Volunteers',
        UNSIGNED_SMALL_INT_MAX,
        'count',
        false
    );
    errors = volunteerCountValidation.errors;

    const volunteerHoursValidation = validateCount(
        errors,
        formData.get(GROUP_CLEANUP_FORM_DATA_IDS.volunteerHours),
        GROUP_CLEANUP_FORM_DATA_IDS.volunteerHours,
        'Volunteer Hours',
        DECIMAL_4_DOT_2_MAX,
        'hours',
        false,
        2
    );
    errors = volunteerHoursValidation.errors;

    const litterValidation = validatePounds(
        errors,
        formData.get(GROUP_CLEANUP_FORM_DATA_IDS.litterCollected),
        GROUP_CLEANUP_FORM_DATA_IDS.litterCollected,
        'Pounds of Litter Collected',
        UNSIGNED_SMALL_INT_MAX,
        true
    );
    errors = litterValidation.errors;

    const recyclingValidation = validatePounds(
        errors,
        formData.get(GROUP_CLEANUP_FORM_DATA_IDS.recyclingCollected),
        GROUP_CLEANUP_FORM_DATA_IDS.recyclingCollected,
        'Pounds of Recycling Collected',
        UNSIGNED_SMALL_INT_MAX,
        true
    );
    errors = recyclingValidation.errors;

    let data: GroupCleanupEventModel | null = null;
    if (errors.size === 0 && dateValidation.date &&
        organizationValidation.selection &&
        locationValidation.selection &&
        volunteerCountValidation.count &&
        volunteerHoursValidation.count &&
        litterValidation.pounds &&
        (recyclingValidation.pounds || recyclingValidation.pounds === 0)
    ) {
        data = {
            date: dateValidation.date,
            organization: organizationValidation.selection,
            location: locationValidation.selection,
            volunteerCount: volunteerCountValidation.count,
            volunteerHours: volunteerHoursValidation.count,
            litterCollected: litterValidation.pounds,
            recyclingCollected: recyclingValidation.pounds
        };
    }
    return { data: data, errors: errors };
}

export function validateGroupCleanupLocation(
    formData: FormData,
    locationInputId: string,
    locationInputLabel: string,
    existingLocations: Map<string, string>
): { data: ReferenceDataModel | null, errors: Map<string, ErrorModel> } {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();
    const locationValidation = validateSimpleTextField(
        errors,
        formData.get(locationInputId),
        locationInputId,
        locationInputLabel,
        50
    );
    errors = locationValidation.errors;

    let data: ReferenceDataModel | null = null;
    if ((!errors || errors.size === 0) && locationValidation.text) {
        if (existingLocations && existingLocations.size > 0 &&
            existingLocations.has(locationValidation.text.trim())) {
            const locationError: ErrorModel = {
                inputId: locationInputId,
                fieldName: locationInputLabel,
                message: `Location '${locationValidation.text.trim()}' already exists.`
            };
            errors.set(locationInputId, locationError);
        } else {
            data = { description: locationValidation.text.trim() }
        }
    }
    return { data: data, errors: errors };
}

export function validateGroupCleanupOrganization(
    formData: FormData,
    orgInputId: string,
    orgInputLabel: string,
    existingOrganizations: Map<string, string>
): { data: GroupModel | null, errors: Map<string, ErrorModel> } {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();
    const organizationValidation = validateSimpleTextField(
        errors,
        formData.get(orgInputId),
        orgInputId,
        orgInputLabel,
        50
    );
    errors = organizationValidation.errors;

    let data: GroupModel | null = null;
    if ((!errors || errors.size === 0) && organizationValidation.text) {
        if (existingOrganizations && existingOrganizations.size > 0 &&
            existingOrganizations.has(organizationValidation.text.trim())) {
            const nameError: ErrorModel = {
                inputId: orgInputId,
                fieldName: orgInputLabel,
                message: `Organization '${organizationValidation.text.trim()}' already exists.`
            };
            errors.set(orgInputId, nameError);
        } else {
            data = {
                name: organizationValidation.text.trim()
            }
        }
    }
    return { data: data, errors: errors };
}