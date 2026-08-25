import { ErrorModel, GroupCleanupEventModel } from '../../models';
import { GroupEntity } from '../../entities/group.entity';
import { ReferenceDataEntity } from '../../entities/referenceData.entity';
import { 
    isFormDataEntryValueNullOrBlank,
    validateDate,
    validatePounds,
    validateCount
} from '../../utils/commonFormValidation';
import { GROUP_CLEANUP_FORM_DATA_IDS } from './volunteerCleanupJson';
import { CleanupOrganizationGroupDAO } from '../../dao/group/cleanupOrganizationGroup.DAO';
import { CleanupLocationReferenceDataDAO } from '../../dao/referenceData/cleanupLocationReferenceData.DAO';
import { DECIMAL_4_DOT_2_MAX, UNSIGNED_SMALL_INT_MAX } from '../../constValues';

async function validateOrganization(
    errors: Map<string, ErrorModel>, orgId: string, inputId: string
): Promise<{ organization: GroupEntity | null, errors: Map<string, ErrorModel> }> {
    if (isFormDataEntryValueNullOrBlank(orgId)) {
        const error: ErrorModel = {
            inputId: inputId,
            fieldName: 'Organization',
            message: 'Please select an organization'
        };
        errors.set(inputId, error);
        return { organization: null, errors: errors };
    } else {
        const cleanupOrgDAO: CleanupOrganizationGroupDAO = new CleanupOrganizationGroupDAO();
        let organization: GroupEntity | null = null;
        if (!Number.isNaN(Number(orgId.trim()))) {
            organization = await cleanupOrgDAO.getById(Number(orgId.trim()));
        }
        if (!organization) {
            const error: ErrorModel = {
                inputId: inputId,
                fieldName: 'Organization',
                message: `Invalid organization selected with id: '${orgId.trim()}'`
            };
            errors.set(inputId, error);
            return { organization: null, errors: errors };
        } else {
            return { organization: { id: Number(orgId.trim()), name: organization.name }, errors: errors };
        }
    }
}

async function validateLocation(
    errors: Map<string, ErrorModel>, locationId: string, inputId: string
): Promise<{ location: ReferenceDataEntity | null, errors: Map<string, ErrorModel> }> {
    if (isFormDataEntryValueNullOrBlank(locationId)) {
        const error: ErrorModel = {
            inputId: inputId,
            fieldName: 'Cleanup Location',
            message: 'Please select a location'
        };
        errors.set(inputId, error);
        return { location: null, errors: errors };
    } else {
        const cleanupLocationDAO: CleanupLocationReferenceDataDAO = new CleanupLocationReferenceDataDAO();
        let location: ReferenceDataEntity | null = null;
        if (!Number.isNaN(Number(locationId.trim()))) {
            location = await cleanupLocationDAO.getByCode(Number(locationId.trim()));
        }
        if (!location) {
            const error: ErrorModel = {
                inputId: inputId,
                fieldName: 'Cleanup Location',
                message: `Invalid location selected with id: '${locationId.trim()}'`
            };
            errors.set(inputId, error);
            return { location: null, errors: errors };
        } else {
            return { location: { code: locationId.trim(), description: location.description }, errors: errors };
        }
    }
}

export async function validateGroupCleanupData(
    formData: FormData, selectedOrganization: string, selectedLocation: string
): Promise<{ data: GroupCleanupEventModel | null, errors: Map<string, ErrorModel> }> {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();
    
    const dateValidation = validateDate(errors, formData.get(GROUP_CLEANUP_FORM_DATA_IDS.date), GROUP_CLEANUP_FORM_DATA_IDS.date);
    errors = dateValidation.errors;

    const organizationValidation = await validateOrganization(
        errors,
        selectedOrganization,
        `${GROUP_CLEANUP_FORM_DATA_IDS.organization}-input`
    );
    errors = organizationValidation.errors;

    const locationValidation = await validateLocation(
        errors,
        selectedLocation,
        `${GROUP_CLEANUP_FORM_DATA_IDS.location}-input`
    );

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
        organizationValidation.organization &&
        locationValidation.location &&
        volunteerCountValidation.count &&
        volunteerHoursValidation.count &&
        litterValidation.pounds &&
        (recyclingValidation.pounds || recyclingValidation.pounds === 0)
    ) {
        data = {
            date: dateValidation.date,
            organization: organizationValidation.organization,
            location: locationValidation.location,
            volunteerCount: volunteerCountValidation.count,
            volunteerHours: volunteerHoursValidation.count,
            litterCollected: litterValidation.pounds,
            recyclingCollected: recyclingValidation.pounds
        };
    }
    return { data: data, errors: errors };
}