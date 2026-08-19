import { BulkyItemModel, DistrictModel, ErrorModel, RoadsideLitterModel } from '../../models';
import { ROADSIDE_LITTER_FORM_DATA_IDS } from './servicesJson';
import { ReferenceDataModel } from '../../models';
import { ReferenceDataDAO, DistrictReferenceDataDAO, BulkyItemReferenceDataDAO } from '../../dao/referenceData';
import { 
    isFormDataEntryValueNullOrBlank,
    isFormDataEntryValueArrayNullOrEmpty,
    validateDate,
    validatePounds,
    validateSimpleTextField
} from '../../utils/commonFormValidation';
import { UNSIGNED_SMALL_INT_MAX } from '../../constValues';
import { RoadsideLitterEventDAO } from '../../dao/event';

async function validateDistricts(errors: Map<string, ErrorModel>, values: FormDataEntryValue[], inputId: string
): Promise<{ districts: DistrictModel[] | null, errors: Map<string, ErrorModel> }> {
    const startingErrorCount: number = errors.size;
    let validDistricts: DistrictModel[] = [];
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
            districts.map((district: ReferenceDataModel) => districtMap.set(district.code, district.description ? district.description : ''));
            values.map((value: FormDataEntryValue) => {
                if (!districtMap.has(value.toString().trim())) {
                    const error: ErrorModel = {
                        inputId: inputId,
                        fieldName: 'Districts',
                        message: `Invalid district selected with code: '${value.toString().trim()}'`
                    };
                    errors.set(inputId, error);
                } else {
                    validDistricts.push({ districtRef: { code: value.toString().trim(), description: '' }});
                }
            });
            
        }
    }
    if (errors.size > startingErrorCount) {
        return { districts: null, errors: errors };
    } else {
        return { districts: validDistricts, errors: errors }; 
    }
}

async function validateBulkyItems(errors: Map<string, ErrorModel>, formData: FormData, selectedBulkyItemValues: string[], inputId: string, searchId?: string
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

const MAX_ROADSIDE_LITTER_LOCATIONS_LENGTH: number = 300;

export async function validateRoadsideLitterData(formData: FormData, selectedBulkyItemValues: string[]
): Promise<{ data: RoadsideLitterModel | null, errors: Map<string, ErrorModel> }> {
    let errors: Map<string, ErrorModel> = new Map<string, ErrorModel>();

    const dateValidation = validateDate(errors, formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.date), ROADSIDE_LITTER_FORM_DATA_IDS.date);
    errors = dateValidation.errors;
    const litterValidation = validatePounds(errors, formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.litterPounds), ROADSIDE_LITTER_FORM_DATA_IDS.litterPounds, 'Litter');
    errors = litterValidation.errors;
    const recyclingValidation = validatePounds(errors, formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.recyclingPounds), ROADSIDE_LITTER_FORM_DATA_IDS.recyclingPounds, 'Recycling');
    errors = recyclingValidation.errors;
    const districtValidation = await validateDistricts(errors, formData.getAll(ROADSIDE_LITTER_FORM_DATA_IDS.districts), `${ROADSIDE_LITTER_FORM_DATA_IDS.districts}-1`);
    errors = districtValidation.errors;
    const locationsValidation = validateSimpleTextField(
        errors,
        formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.locations),
        ROADSIDE_LITTER_FORM_DATA_IDS.locations,
        'Locations',
        MAX_ROADSIDE_LITTER_LOCATIONS_LENGTH
    );
    errors = locationsValidation.errors;
    
    let bulkyItemValidation: { bulkyItems: BulkyItemModel[] | null, errors: Map<string, ErrorModel> } =
        { bulkyItems: null, errors: errors};
    const hasBulkyItems: FormDataEntryValue | null = formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems);
    console.log(hasBulkyItems);
    if (isFormDataEntryValueNullOrBlank(hasBulkyItems)) {
        const error: ErrorModel = {
            inputId: `${ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems}-no`,
            fieldName: 'Were any bulky items collected',
            message: 'Please whether bulky items were collected or not.'
        };
        errors.set(`${ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems}-no`, error);
    } else if (hasBulkyItems && hasBulkyItems.toString() === 'yes') {
        bulkyItemValidation = await validateBulkyItems(
            errors,
            formData,
            selectedBulkyItemValues,
            ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems,
            `${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-search`
        );
        errors = bulkyItemValidation.errors;
    }

    console.log(dateValidation.date);
    console.log(`litter: ${litterValidation.pounds}`);
    console.log(`recycling: ${recyclingValidation.pounds}`);
    console.log(districtValidation.districts);
    console.log(`locations: ${locationsValidation.text}`);
    console.log(bulkyItemValidation.bulkyItems);


    let data = null;
    if (errors.size === 0 && dateValidation.date && litterValidation.pounds && recyclingValidation.pounds &&
        districtValidation.districts && locationsValidation.text &&
        (hasBulkyItems && hasBulkyItems.toString() === 'no' || bulkyItemValidation.bulkyItems)
    ) {
        data = {
            date: dateValidation.date,
            litterPounds: litterValidation.pounds,
            recyclingPounds: recyclingValidation.pounds,
            districts: districtValidation.districts,
            locations: locationsValidation.text,
            bulkyItems: bulkyItemValidation.bulkyItems ? bulkyItemValidation.bulkyItems : []
         };
    }
    return { data: data, errors: errors };
}

export async function saveRoadsideLitterData(formData: FormData, selectedBulkyItemValues: string[], isUpdate: boolean) {
    let validation: { data: RoadsideLitterModel | null, errors: Map<string, ErrorModel> } = await validateRoadsideLitterData(formData, selectedBulkyItemValues);
    console.log(`error count: ${validation.errors.size}`);
    console.log(validation.data);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        console.log('about to save Roadside Litter event with DAO');
        const roadsideLitterDAO: RoadsideLitterEventDAO = new RoadsideLitterEventDAO();
        await roadsideLitterDAO.save(validation.data, isUpdate);
    }
    console.log(formData);
    return validation.errors;
}

export async function saveCleanTeamData(formData: FormData) {
    
}

export async function saveTrashRoutesData(formData: FormData) {
    
}

export async function saveCountyCleanupData(formData: FormData) {
    
}