import { ComboBox, Textbox } from '../../../components';
import { ErrorModel } from '../../../models';
import { ifErrorThenGetErrorText } from '../../../utils/ifErrorThenGetErrorText';
import { EDUCATION_FORM_DATA_IDS } from '../otherJson';

export function EducationFormFields({ recipientOptions, topicOptions, errors, handleRecipientChange, handleTopicChange }:
    {
        recipientOptions: string,
        topicOptions: string,
        errors: Map<string, ErrorModel>,
        handleRecipientChange?: (value: string) => void,
        handleTopicChange?: (value: string) => void
    }
) {
    return (
        <div className="flex flex-col gap-4 mt-3">
            <Textbox
                inputId={EDUCATION_FORM_DATA_IDS.date}
                inputType="date"
                labelText="Date"
                descriptionText="Please enter the date of the educational event."
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, EDUCATION_FORM_DATA_IDS.date)}>
            </Textbox>
            <ComboBox
                label="Recipient"
                searchInputId={`${EDUCATION_FORM_DATA_IDS.recipient}-input`}
                listboxId={`${EDUCATION_FORM_DATA_IDS.recipient}-list`}
                buttonId={`${EDUCATION_FORM_DATA_IDS.recipient}-toggle`}
                options={recipientOptions}
                isRequired={true}
                autocomplete="list"
                errorText={ifErrorThenGetErrorText(errors, `${EDUCATION_FORM_DATA_IDS.recipient}-input`)}
                handleChange={handleRecipientChange}>
            </ComboBox>
            <ComboBox
                label="Educational Topic"
                searchInputId={`${EDUCATION_FORM_DATA_IDS.topic}-input`}
                listboxId={`${EDUCATION_FORM_DATA_IDS.topic}-list`}
                buttonId={`${EDUCATION_FORM_DATA_IDS.topic}-toggle`}
                options={topicOptions}
                isRequired={true}
                autocomplete="list"
                errorText={ifErrorThenGetErrorText(errors, `${EDUCATION_FORM_DATA_IDS.topic}-input`)}
                handleChange={handleTopicChange}>
            </ComboBox>
            <Textbox
                inputId={EDUCATION_FORM_DATA_IDS.duration}
                inputType="number"
                labelText="Event Duration"
                descriptionText="Please enter the number of hours that the event lasted. Please round to the nearest quarter number (0.00, 0.25, 0.50, or 0.75)."
                step={0.25}
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, EDUCATION_FORM_DATA_IDS.duration)}>
            </Textbox>
            <Textbox
                inputId={EDUCATION_FORM_DATA_IDS.studentCount}
                inputType="number"
                labelText="Number of Students"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, EDUCATION_FORM_DATA_IDS.studentCount)}>
            </Textbox>
            <Textbox
                inputId={EDUCATION_FORM_DATA_IDS.volunteerCount}
                inputType="number"
                labelText="Number of Volunteers"
                descriptionText="Please enter the number of volunteers present at the event, including any parents who acted as chaperones."
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, EDUCATION_FORM_DATA_IDS.volunteerCount)}>
            </Textbox>
            <Textbox
                inputId={EDUCATION_FORM_DATA_IDS.volunteerHours}
                inputType="number"
                labelText="Volunteer Hours"
                descriptionText="Please enter the combined volunteer hours of all volunteers at the event. Please round to the nearest quarter number (0.00, 0.25, 0.50, or 0.75)."
                step={0.25}
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, EDUCATION_FORM_DATA_IDS.volunteerHours)}>
            </Textbox>
        </div>
    );
}