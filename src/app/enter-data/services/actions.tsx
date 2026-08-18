import { ErrorModel, RoadsideLitterModel } from '../../models';
import { ROADSIDE_LITTER_FORM_DATA_IDS } from './servicesJson';
import { ReferenceDataModel } from '../../models';
import { ReferenceDataDAO, DistrictReferenceDataDAO, BulkyItemReferenceDataDAO } from '../../dao/referenceDataIndex';
import { 
    isFormDataEntryValueNullOrBlank,
    isFormDataEntryValueArrayNullOrEmpty,
    validateDate,
    validatePounds,
    validateSimpleTextField
} from '../../utils/commonFormValidation';
import { UNSIGNED_SMALL_INT_MAX } from '../../constValues';

function parseRoadsideLitterData(formData: FormData) {

}

async function validateDistricts(errors: Map<string, ErrorModel>, values: FormDataEntryValue[], inputId: string): Promise<Map<string, ErrorModel>> {
    if (isFormDataEntryValueArrayNullOrEmpty(values)) {
        const error: ErrorModel = {
            inputId: inputId,
            fieldName: 'Districts',
            message: 'Please select at least one district'
        };
        errors.set(inputId, error);
    } else {
        const districtRefDAO: ReferenceDataDAO = new DistrictReferenceDataDAO();
        const districts: ReferenceDataModel[] = await districtRefDAO.getAll();
        if (districts && districts.length >= 1) {
            const districtMap = new Map<string, string>();
            districts.map((district: ReferenceDataModel) => districtMap.set(district.code, district.description));
            values.map((value: FormDataEntryValue) => {
                if (!districtMap.has(value.toString().trim())) {
                    const error: ErrorModel = {
                        inputId: inputId,
                        fieldName: 'Districts',
                        message: `Invalid district selected with code: '${value.toString().trim()}'`
                    };
                    errors.set(inputId, error);
                }
            });
        }
    }
    return errors;
}

async function validateBulkyItems(errors: Map<string, ErrorModel>, formData: FormData, inputId: string, searchId?: string): Promise<Map<string, ErrorModel>> {
    let quantityErrors: ErrorModel[] = [];
    let quantityField: FormDataEntryValue | null;
    const selectedBulkyItems: FormDataEntryValue[] = formData.getAll(inputId);
    if (isFormDataEntryValueArrayNullOrEmpty(selectedBulkyItems)) {
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
            bulkyItems.map((item: ReferenceDataModel) => bulkyItemsMap.set(`${item.code}`, item.description));
            
            selectedBulkyItems.map((value: FormDataEntryValue) => {
                console.log(value);
                const [itemLabel, itemId] = value.toString().trim().split('|');
                console.log(`itemLabel: ${itemLabel} | itemId: ${itemId}`);
                if (!bulkyItemsMap.has(itemId)) {
                    const error: ErrorModel = {
                        inputId: searchId ? searchId : `${inputId}-1`,
                        fieldName: 'Bulky Items Collected',
                        message: `Invalid bulky item selected with id: '${itemId}'`
                    };
                    errors.set(inputId, error);
                }
                quantityField = formData.get(`bulky-item-${itemId}-quantity`);
                console.log(`fieldName: ${itemLabel} Quantity`)
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
    return errors;
}

const MAX_ROADSIDE_LITTER_LOCATIONS_LENGTH: number = 300;

export async function validateRoadsideLitterData(formData: FormData): Promise<Map<string, ErrorModel>> {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();

    errors = validateDate(errors, formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.date), ROADSIDE_LITTER_FORM_DATA_IDS.date),
    errors = validatePounds(errors, formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.litterPounds), ROADSIDE_LITTER_FORM_DATA_IDS.litterPounds, 'Litter'),
    errors = validatePounds(errors, formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.recyclingPounds), ROADSIDE_LITTER_FORM_DATA_IDS.recyclingPounds, 'Recycling'),
    errors = await validateDistricts(errors, formData.getAll(ROADSIDE_LITTER_FORM_DATA_IDS.districts), `${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-1`);
    errors = validateSimpleTextField(
        errors,
        formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.locations),
        ROADSIDE_LITTER_FORM_DATA_IDS.locations,
        'Locations',
        MAX_ROADSIDE_LITTER_LOCATIONS_LENGTH
    );
    if (isFormDataEntryValueNullOrBlank(formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems))) {
        const error: ErrorModel = {
            inputId: `${ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems}-no`,
            fieldName: 'Were any bulky items collected',
            message: 'Please whether bulky items were collected or not.'
        };
        errors.set(`${ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems}-no`, error);
    } else if (formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems)?.toString() === 'yes') {
        errors = await validateBulkyItems(errors, formData, ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems, `${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-search`);
    }

    console.log(errors);

    return errors;
}

export async function saveRoadsideLitterData(formData: FormData) {
    parseRoadsideLitterData
    console.log(formData);
    console.log(formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.date));
    console.log(formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.litterPounds));
    console.log(formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.recyclingPounds));
    console.log(formData.getAll(ROADSIDE_LITTER_FORM_DATA_IDS.districts));
    console.log(formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.locations));
    console.log(formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems));
    console.log(formData.getAll(ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems));
}

export async function saveCleanTeamData(formData: FormData) {
    
}

export async function saveTrashRoutesData(formData: FormData) {
    
}

export async function saveCountyCleanupData(formData: FormData) {
    
}