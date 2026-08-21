'use server'

import { AdoptASpotGroupModel, GroupModel, ReferenceDataModel } from '../../models';
import { ComboBoxListItemModel } from '../../components/comboBox/comboBoxListItem.model';

// TODO: Pull options from database
export async function getAdoptASpotAssignmentOptions() {
    let newAdoptASpotAssignmentOptions: ComboBoxListItemModel[] = [];
    // const adoptASpotDAO: GroupDAO = new AdoptASpotGroupDAO();
    try {
        // const items: AdoptASpotGroupModel[] = await adoptASpotDAO.getAll();
        const items: AdoptASpotGroupModel[] = [
            { id: 1, name: 'Example Group', location: 'Example Park' },
            { id: 2, name: 'Another Group', location: 'Another Park' },
            { id: 3, name: 'This Group', location: 'That Park' },
            { id: 4, name: 'The Coolest Group', location: 'The Coolest Park' }
        ];
        if (items && items.length >= 1) {
            for (let i = 0; i < items.length; i++) {
                newAdoptASpotAssignmentOptions.push({
                    key: `adopted-spot-${items[i]?.id}`,
                    listItemId: `adopted-spot-${i + 1}`,
                    label: `${items[i]?.name}`,
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
                    key: `location-${locations[i]?.code}`,
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
                    key: `organization-${organizations[i]?.id}`,
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