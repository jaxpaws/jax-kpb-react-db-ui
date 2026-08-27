'use server'

import {
    BagSwapEventModel,
    EducationEventModel,
    ErrorModel,
    TreePlantingEventModel
} from '../../models';
import { ComboBoxListItemModel } from '../../components/comboBox/comboBoxListItem.model';
import { validateBagSwapData } from './validation/bagSwapValidation';
import { validateEducationData } from './validation/educationValidation';
import { validateTreePlantingData } from './validation/treePlantingValidation';
import { BagSwapEventDAO, TreePlantingEventDAO } from '../../dao/event';
import { EducationEventDAO } from '../../dao/event';
import { EducationRecipientGroupDAO } from '../../dao/group';
import { EducationTopicReferenceDataDAO } from '../../dao/referenceData';
import { GroupEntity } from '../../entities/group.entity';
import { ReferenceDataEntity } from '../../entities/referenceData.entity';

export async function getEducationRecipients(): Promise<string> {
    let recipientOptions: ComboBoxListItemModel[] = [];
    const recipientDAO: EducationRecipientGroupDAO = new EducationRecipientGroupDAO();
    try {
        const recipients: GroupEntity[] = await recipientDAO.getAll();
        if (recipients && recipients.length >= 1) {
            for (let i = 0; i < recipients.length; i++) {
                recipientOptions.push({
                    key: `${recipients[i]?.id}`,
                    listItemId: `recipient-${i + 1}`,
                    label: recipients[i]?.name,
                    isSelected: false
                });
            }
            return JSON.stringify(recipientOptions);
        }
        return '[]';
    } catch (error) {
        console.error(`Error getting education recipient options.`);
        return '[]';
    }
}

export async function getEducationTopics(): Promise<string> {
    let topicOptions: ComboBoxListItemModel[] = [];
    const topicDAO: EducationTopicReferenceDataDAO = new EducationTopicReferenceDataDAO();
    try {
        const topics: ReferenceDataEntity[] = await topicDAO.getAll();
        console.log
        if (topics && topics.length >= 1) {
            for (let i = 0; i < topics.length; i++) {
                topicOptions.push({
                    key: `${topics[i]?.code}`,
                    listItemId: `recipient-${i + 1}`,
                    label: topics[i]?.description,
                    isSelected: false
                });
            }
            return JSON.stringify(topicOptions);
        }
        return '[]';
    } catch (error) {
        console.error(`Error getting education topic options.`);
        return '[]';
    }
}

export async function saveBagSwapData(formData: FormData, isUpdate: boolean): Promise<Map<string, ErrorModel>> {
    let validation: { data: BagSwapEventModel | null, errors: Map<string, ErrorModel> } = validateBagSwapData(formData);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const bagSwapDAO: BagSwapEventDAO = new BagSwapEventDAO();
        bagSwapDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveEducationData(formData: FormData, recipientId: string, topicId: string, isUpdate: boolean) {
    let validation: { data: EducationEventModel | null, errors: Map<string, ErrorModel> } =
        await validateEducationData(formData, recipientId, topicId);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const educationDAO: EducationEventDAO = new EducationEventDAO();
        educationDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}

export async function saveTreePlantingData(formData: FormData, isUpdate: boolean) {
    let validation: { data: TreePlantingEventModel | null, errors: Map<string, ErrorModel> } = validateTreePlantingData(formData);
    if ((!validation.errors || validation.errors.size === 0) && validation.data) {
        const treePlantingDAO: TreePlantingEventDAO = new TreePlantingEventDAO();
        treePlantingDAO.save(validation.data, isUpdate);
    }
    return validation.errors;
}