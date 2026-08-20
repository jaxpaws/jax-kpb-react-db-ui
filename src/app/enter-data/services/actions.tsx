import { CleanTeamModel, ErrorModel, RoadsideLitterModel } from '../../models';
import { CleanTeamEventDAO, RoadsideLitterEventDAO } from '../../dao/event';
import { validateCleanTeamData } from './cleanTeamValidation';
import { validateRoadsideLitterData } from './roadsideLitterValidation';

export async function saveCleanTeamData(formData: FormData, isUpdate: boolean) {
    console.log(`saving clean team data: isUpdate=${isUpdate}`);
    let validation: { data: CleanTeamModel | null, errors: Map<string, ErrorModel> } = await validateCleanTeamData(formData);
    console.log(validation);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const cleanTeamDAO: CleanTeamEventDAO = new CleanTeamEventDAO();
        await cleanTeamDAO.save(validation.data, isUpdate)
    }
    return validation.errors;
}

export async function saveCountyCleanupData(formData: FormData) {
    
}

export async function saveRoadsideLitterData(formData: FormData, selectedBulkyItemValues: string[], isUpdate: boolean) {
    let validation: { data: RoadsideLitterModel | null, errors: Map<string, ErrorModel> } = await validateRoadsideLitterData(formData, selectedBulkyItemValues);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const roadsideLitterDAO: RoadsideLitterEventDAO = new RoadsideLitterEventDAO();
        await roadsideLitterDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveTrashRoutesData(formData: FormData) {
    
}

