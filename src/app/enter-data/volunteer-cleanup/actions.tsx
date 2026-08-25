'use server'

import {
    AdoptASpotEventModel,
    AdoptASpotGroupModel,
    ErrorModel,
    GroupModel,
    ReferenceDataModel
} from '../../models';
import { validateAdoptASpotData } from './adoptASpotValidation';
import { ComboBoxListItemModel } from '../../components/comboBox/comboBoxListItem.model';
import { AdoptASpotGroupDAO } from '../../dao/group';
import { AdoptASpotEventDAO } from '../../dao/event';
import { AdoptASpotGroupEntity } from '../../entities/adoptASpotGroup.entity';

// TODO: Pull options from database
export async function getAdoptASpotAssignmentOptions() {
    let newAdoptASpotAssignmentOptions: ComboBoxListItemModel[] = [];
    const adoptASpotDAO: AdoptASpotGroupDAO = new AdoptASpotGroupDAO();
    try {
        const spots: AdoptASpotGroupEntity[] = await adoptASpotDAO.getAll();
        // const items: AdoptASpotGroupModel[] = [
        //     { id: 1, name: 'Example Group', location: 'Example Park' },
        //     { id: 2, name: 'Another Group', location: 'Another Park' },
        //     { id: 3, name: 'This Group', location: 'That Park' },
        //     { id: 4, name: 'The Coolest Group', location: 'The Coolest Park' }
        // ];
        if (spots && spots.length >= 1) {
            for (let i = 0; i < spots.length; i++) {
                newAdoptASpotAssignmentOptions.push({
                    key: `${spots[i]?.id}`,
                    listItemId: `adopted-spot-${i + 1}`,
                    label: `${spots[i]?.location} - ${spots[i]?.name}`,
                    isSelected: false
                });
            }
            console.log(newAdoptASpotAssignmentOptions);
            return JSON.stringify(newAdoptASpotAssignmentOptions);
        }
        return '';
    } catch (error) {
        console.error(`Error getting adopt-a-spot assignment options.`);
        return '';
    }
}

// TODO: Pull options from database
export async function getCleanupLocationOptions() {
    let newCleanupLocationOptions: ComboBoxListItemModel[] = [];
    // const cleanupLocationRefDataDAO: GroupDAO = new CleanupLocationReferenceDataDAO();
    try {
        // const locations: ReferenceDataModel[] = await cleanupLocationRefDataDAO.getAll();
        const locations: ReferenceDataModel[] = [
            { code: '1', description: 'Example Park' },
            { code: '2', description: 'Another Park' },
            { code: '3', description: 'That Park' },
            { code: '4', description: 'The Coolest Park' }
        ];
        if (locations && locations.length >= 1) {
            for (let i = 0; i < locations.length; i++) {
                newCleanupLocationOptions.push({
                    key: `${locations[i]?.code}`,
                    listItemId: `location-${i + 1}`,
                    label: `${locations[i]?.description}`,
                    isSelected: false
                });
            }
            console.log(newCleanupLocationOptions);
            return JSON.stringify(newCleanupLocationOptions);
        }
        return '';
    } catch (error) {
        console.error(`Error getting group cleanup location options.`);
        return '';
    }
}

// TODO: Pull options from database
export async function getCleanupOrganizationOptions() {
    let newCleanupOrganizationOptions: ComboBoxListItemModel[] = [];
    // const cleanupOrganizationDAO: GroupDAO = new CleanupOrganizationGroupDAO();
    try {
        // const organizations: GroupModel[] = await cleanupOrganizationDAO.getAll();
        const organizations: GroupModel[] = [
            { id: 1, name: 'Example Group' },
            { id: 2, name: 'Another Group' },
            { id: 3, name: 'This Group' },
            { id: 4, name: 'The Coolest Group' }
        ];
        if (organizations && organizations.length >= 1) {
            for (let i = 0; i < organizations.length; i++) {
                newCleanupOrganizationOptions.push({
                    key: `${organizations[i]?.id}`,
                    listItemId: `organization-${i + 1}`,
                    label: `${organizations[i]?.name}`,
                    isSelected: false
                });
            }
            console.log(newCleanupOrganizationOptions);
            return JSON.stringify(newCleanupOrganizationOptions);
        }
        return '';
    } catch (error) {
        console.error(`Error getting group cleanup organization options.`);
        return '';
    }
}

export async function saveAdoptASpotData(formData: FormData, spotId: string, isUpdate: boolean) {
    console.log('in saveAdoptASpotData');
    console.log(formData);
    let validation: { data: AdoptASpotEventModel | null, errors: Map<string, ErrorModel> } =
        await validateAdoptASpotData(formData, spotId);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const adoptASpotDAO: AdoptASpotEventDAO = new AdoptASpotEventDAO();
        await adoptASpotDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveGroupCleanupData(formData: FormData, orgId: string, locationId: string, isUpdate: boolean) {
    console.log('Saving...');
    // let validation: { data: GroupCleanupEventModel | null, errors: Map<string, ErrorModel> } =
    //     await validateGroupCleanupData(formData, orgId, locationId);
    // if ((!validation.errors || validation.errors.size === 0) && validation.data) {
    //     const groupCleanupDAO: GroupCleanupEventDAO = new GroupCleanupEventDAO();
    //     await groupCleanupDAO.save(validation.data, isUpdate);
    // }
    // return validation.errors;
}