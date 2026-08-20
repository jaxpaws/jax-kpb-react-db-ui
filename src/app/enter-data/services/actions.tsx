import { CleanTeamModel, CountyCleanupModel, ErrorModel, RoadsideLitterModel } from '../../models';
import { CleanTeamEventDAO, CountyCleanupEventDAO, RoadsideLitterEventDAO } from '../../dao/event';
import { validateCleanTeamData } from './cleanTeamValidation';
import { validateCountyCleanupData } from './countyCleanupValidation';
import { validateRoadsideLitterData } from './roadsideLitterValidation';

export async function saveCleanTeamData(formData: FormData, isUpdate: boolean) {
    let validation: { data: CleanTeamModel | null, errors: Map<string, ErrorModel> } = await validateCleanTeamData(formData);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const cleanTeamDAO: CleanTeamEventDAO = new CleanTeamEventDAO();
        await cleanTeamDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveCountyCleanupData(formData: FormData, selectedBulkyItemValues: string[], isUpdate: boolean) {
    let validation: { data: CountyCleanupModel | null, errors: Map<string, ErrorModel> } = await validateCountyCleanupData(formData, selectedBulkyItemValues);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const countyCleanupDAO: CountyCleanupEventDAO = new CountyCleanupEventDAO();
        await countyCleanupDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveRoadsideLitterData(formData: FormData, selectedBulkyItemValues: string[], isUpdate: boolean) {
    let validation: { data: RoadsideLitterModel | null, errors: Map<string, ErrorModel> } = await validateRoadsideLitterData(formData, selectedBulkyItemValues);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const roadsideLitterDAO: RoadsideLitterEventDAO = new RoadsideLitterEventDAO();
        await roadsideLitterDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveTrashRoutesData(formData: FormData, isUpdate: boolean) {
    
}

