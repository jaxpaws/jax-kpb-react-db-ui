import { ErrorModel } from '../../models';
import { REPORTING_DATA_VALUES } from './otherJson';
import { BagSwapFormFields, EducationFormFields, TreePlantingFormFields } from './formsByActivity';

export function OtherFormByActivity({
    activity,
    educationRecipients,
    educationTopics,
    errors,
    handleEdRecipientChange,
    handleEdTopicChange
}: {
    activity: string,
    educationRecipients: string,
    educationTopics: string,
    errors: Map<string, ErrorModel>,
    handleEdRecipientChange: (value: string) => void,
    handleEdTopicChange: (value: string) => void
}) {
    switch (activity) {
        case REPORTING_DATA_VALUES.bagSwap:
            return (<BagSwapFormFields errors={errors}></BagSwapFormFields>);
        case REPORTING_DATA_VALUES.education:
            return (
                <EducationFormFields
                    recipientOptions={educationRecipients}
                    topicOptions={educationTopics}
                    errors={errors}
                    handleRecipientChange={handleEdRecipientChange}
                    handleTopicChange={handleEdTopicChange}>
                </EducationFormFields>
            );
        case REPORTING_DATA_VALUES.treePlanting:
            return (<TreePlantingFormFields errors={errors}></TreePlantingFormFields>);
        default:
            return null;
    }
}