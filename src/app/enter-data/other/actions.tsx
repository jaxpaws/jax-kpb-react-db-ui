import { ComboBoxListItemModel } from '../../components/comboBox/comboBoxListItem.model';

export async function getEducationRecipients(): Promise<string> {
    let recipientOptions: ComboBoxListItemModel[] = [];
    const recipients: { id: number, name: string }[] = [
        { id: 1, name: 'Gallery Night' },
        { id: 2, name: 'Girl Scouts' },
        { id: 3, name: 'Montessori School' },
        { id: 4, name: 'Brown Barge Middle School' }
    ];
    try {
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
    const topics: { code: number | string, topic: string }[] = [
        { code: 1, topic: 'Marine Debris' },
        { code: 2, topic: 'Litter' },
        { code: 3, topic: 'Recycling' }
    ];
    try {
        if (topics && topics.length >= 1) {
            for (let i = 0; i < topics.length; i++) {
                topicOptions.push({
                    key: `${topics[i]?.code}`,
                    listItemId: `recipient-${i + 1}`,
                    label: topics[i]?.topic,
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