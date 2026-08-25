'use server'

import {
    CleanTeamEventModel,
    CountyCleanupEventModel,
    ErrorModel,
    ReferenceDataModel,
    RoadsideLitterEventModel,
    TrashRoutesEventModel
} from '../../models';
import {
    CleanTeamEventDAO,
    CountyCleanupEventDAO,
    RoadsideLitterEventDAO,
    TrashRoutesEventDAO
} from '../../dao/event';
import { validateCleanTeamData } from './cleanTeamValidation';
import { validateCountyCleanupData } from './countyCleanupValidation';
import { validateRoadsideLitterData } from './roadsideLitterValidation';
import { validateTrashRoutesData } from './trashRoutesValidation';
import { ReferenceDataDAO, DistrictReferenceDataDAO, BulkyItemReferenceDataDAO } from '../../dao/referenceData';
import { MultiSelectOptionModel } from '../../components/multiSelect/multiSelectOption.model';

export async function getBulkyItemRefData() {
    let newBulkyItemOptions: MultiSelectOptionModel[] = [];
    const bulkyItemRefDAO: ReferenceDataDAO = new BulkyItemReferenceDataDAO();
    try {
        const items: ReferenceDataModel[] = await bulkyItemRefDAO.getAll();
        if (items && items.length >= 1) {
            for (let i = 0; i < items.length; i++) {
                newBulkyItemOptions.push({
                    key: `bulky-item-${items[i]?.code}`,
                    label: items[i]?.description,
                    inputId: `bulky-item-${i + 1}`,
                    value: `${items[i]?.description}|${items[i]?.code}`
                });
            }
            console.log(newBulkyItemOptions);
            return JSON.stringify(newBulkyItemOptions);
        }
        return '';
    } catch (error) {
        console.error(`Error getting bulky items reference values.`);
        return '';
    }
}

export async function getDistrictRefData() {
    let newDistrictOptions: MultiSelectOptionModel[] = [];
    const districtRefDAO: ReferenceDataDAO = new DistrictReferenceDataDAO();
    try {
    const districts: ReferenceDataModel[] = await districtRefDAO.getAll();
        if (districts && districts.length >= 1) {
            for (let i = 0; i < districts.length; i++) {
                newDistrictOptions.push({
                    key: `district-${districts[i]?.code}`,
                    label: districts[i]?.description,
                    inputId: `district-${i + 1}`,
                    value: districts[i]?.code
                });
            }
            console.log(newDistrictOptions);
            return JSON.stringify(newDistrictOptions);
        }
        return '';
    } catch (error) {
        console.error(`Error getting district reference values.`);
        return '';
    };
}

export async function saveCleanTeamData(formData: FormData, isUpdate: boolean) {
    let validation: { data: CleanTeamEventModel | null, errors: Map<string, ErrorModel> } = await validateCleanTeamData(formData);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const cleanTeamDAO: CleanTeamEventDAO = new CleanTeamEventDAO();
        await cleanTeamDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveCountyCleanupData(formData: FormData, selectedBulkyItemValues: string[], isUpdate: boolean) {
    let validation: { data: CountyCleanupEventModel | null, errors: Map<string, ErrorModel> } = await validateCountyCleanupData(formData, selectedBulkyItemValues);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const countyCleanupDAO: CountyCleanupEventDAO = new CountyCleanupEventDAO();
        await countyCleanupDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveRoadsideLitterData(formData: FormData, selectedBulkyItemValues: string[], isUpdate: boolean) {
    let validation: { data: RoadsideLitterEventModel | null, errors: Map<string, ErrorModel> } = await validateRoadsideLitterData(formData, selectedBulkyItemValues);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const roadsideLitterDAO: RoadsideLitterEventDAO = new RoadsideLitterEventDAO();
        await roadsideLitterDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveTrashRoutesData(formData: FormData, isUpdate: boolean) {
    let validation: { data: TrashRoutesEventModel | null, errors: Map<string, ErrorModel> } = await validateTrashRoutesData(formData);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const trashRoutesDAO: TrashRoutesEventDAO = new TrashRoutesEventDAO();
        await trashRoutesDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

