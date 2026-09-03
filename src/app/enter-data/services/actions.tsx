'use server'

import {
    CleanTeamEventModel,
    CountyCleanupEventModel,
    RoadsideLitterEventModel,
    TrashRoutesEventModel
} from '../../models/event';
import { ErrorModel, ReferenceDataModel } from '../../models';
import {
    CleanTeamEventDAO,
    CountyCleanupEventDAO,
    RoadsideLitterEventDAO,
    TrashRoutesEventDAO
} from '../../dao/event';
import { validateCleanTeamData } from './validation/cleanTeamValidation';
import { validateCountyCleanupData } from './validation/countyCleanupValidation';
import { validateRoadsideLitterData } from './validation/roadsideLitterValidation';
import { validateTrashRoutesData } from './validation/trashRoutesValidation';
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
                    value: `${districts[i]?.code}`
                });
            }
            return JSON.stringify(newDistrictOptions);
        }
        return '';
    } catch (error) {
        console.error(`Error getting district reference values.`);
        return '';
    };
}

export async function saveCleanTeamData(
    formData: FormData, isUpdate: boolean
): Promise<{ isSuccessful: boolean, data: CleanTeamEventModel | null, errors: Map<string, ErrorModel> }> {
    let addedId: number = -1;
    let validation: { data: CleanTeamEventModel | null, errors: Map<string, ErrorModel> } = await validateCleanTeamData(formData);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const cleanTeamDAO: CleanTeamEventDAO = new CleanTeamEventDAO();
        addedId = await cleanTeamDAO.save(validation.data, isUpdate);
    }
    return { isSuccessful: addedId > 0, ...validation };
}

export async function saveCountyCleanupData(
    formData: FormData, selectedBulkyItemValues: string[], isUpdate: boolean
): Promise<{ isSuccessful: boolean, data: CountyCleanupEventModel | null, errors: Map<string, ErrorModel> }> {
    let addedId: number = -1;
    let validation: { data: CountyCleanupEventModel | null, errors: Map<string, ErrorModel> } = await validateCountyCleanupData(formData, selectedBulkyItemValues);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const countyCleanupDAO: CountyCleanupEventDAO = new CountyCleanupEventDAO();
        addedId = await countyCleanupDAO.save(validation.data, isUpdate);
    }
    return { isSuccessful: addedId > 0, ...validation };
}

export async function saveRoadsideLitterData(
    formData: FormData, selectedBulkyItemValues: string[], isUpdate: boolean
): Promise<{ isSuccessful: boolean, data: RoadsideLitterEventModel | null, errors: Map<string, ErrorModel> }> {
    let addedId: number = -1;
    let validation: { data: RoadsideLitterEventModel | null, errors: Map<string, ErrorModel> } = await validateRoadsideLitterData(formData, selectedBulkyItemValues);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const roadsideLitterDAO: RoadsideLitterEventDAO = new RoadsideLitterEventDAO();
        addedId = await roadsideLitterDAO.save(validation.data, isUpdate);
    }
    return { isSuccessful: addedId > 0, ...validation };
}

export async function saveTrashRoutesData(
    formData: FormData, isUpdate: boolean
): Promise<{ isSuccessful: boolean, data: TrashRoutesEventModel | null, errors: Map<string, ErrorModel> }> {
    let addedId: number = -1;
    let validation: { data: TrashRoutesEventModel | null, errors: Map<string, ErrorModel> } = await validateTrashRoutesData(formData);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const trashRoutesDAO: TrashRoutesEventDAO = new TrashRoutesEventDAO();
        addedId = await trashRoutesDAO.save(validation.data, isUpdate);
    }
    return { isSuccessful: addedId > 0, ...validation };
}

