import { ErrorModel } from '../../models';
import { REPORTING_DATA_VALUES } from './otherJson';
import { BagSwapFormFields, EducationFormFields, TreePlantingFormFields } from './formsByActivity';

export function OtherFormByActivity({
    activity,
    educationRecipients,
    selectedEducationRecipient,
    educationTopics,
    selectedEducationTopic,
    errors,
    handleEdRecipientChange,
    handleEdTopicChange,
    onAddRecipient,
    onAddTopic
}: {
    activity: string,
    educationRecipients: string,
    selectedEducationRecipient?: string,
    educationTopics: string,
    selectedEducationTopic?: string,
    errors: Map<string, ErrorModel>,
    handleEdRecipientChange: (value: string) => void,
    handleEdTopicChange: (value: string) => void,
    onAddRecipient?: (event: any) => void,
    onAddTopic?: (event: any) => void
}) {
    switch (activity) {
        case REPORTING_DATA_VALUES.bagSwap:
            return (<BagSwapFormFields errors={errors}></BagSwapFormFields>);
        case REPORTING_DATA_VALUES.education:
            return (
                <EducationFormFields
                    recipientOptions={educationRecipients}
                    selectedRecipient={selectedEducationRecipient}
                    topicOptions={educationTopics}
                    selectedTopic={selectedEducationTopic}
                    errors={errors}
                    handleRecipientChange={handleEdRecipientChange}
                    handleTopicChange={handleEdTopicChange}
                    onAddRecipient={onAddRecipient}
                    onAddTopic={onAddTopic}>
                </EducationFormFields>
            );
        case REPORTING_DATA_VALUES.treePlanting:
            return (<TreePlantingFormFields errors={errors}></TreePlantingFormFields>);
        default:
            return null;
    }
}