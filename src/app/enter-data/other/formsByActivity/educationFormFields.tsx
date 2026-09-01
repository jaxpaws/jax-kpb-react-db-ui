import { useState } from 'react';
import { ComboBox, RadioList, Textbox } from '../../../components';
import { ErrorModel } from '../../../models';
import { ifErrorThenGetErrorText } from '../../../utils/ifErrorThenGetErrorText';
import { EDUCATION_FORM_DATA_IDS, HAS_VOLUNTEERS_OPTIONS } from '../otherJson';

export function EducationFormFields(
{ 
    recipientOptions, selectedRecipient, topicOptions, selectedTopic, errors, handleRecipientChange, handleTopicChange, onAddRecipient, onAddTopic
}: {
    recipientOptions: string,
    selectedRecipient?: string,
    topicOptions: string,
    selectedTopic?: string,
    errors: Map<string, ErrorModel>,
    handleRecipientChange?: (value: string) => void,
    handleTopicChange?: (value: string) => void,
    onAddRecipient?: (event: any) => void,
    onAddTopic?: (event: any) => void
}) {
    const [hasVolunteers, setHasVolunteers] = useState<string>('no');

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
            <div className="flex flex-row gap-3 flex-wrap">
                <ComboBox
                    label="Recipient"
                    searchInputId={`${EDUCATION_FORM_DATA_IDS.recipient}-input`}
                    listboxId={`${EDUCATION_FORM_DATA_IDS.recipient}-list`}
                    buttonId={`${EDUCATION_FORM_DATA_IDS.recipient}-toggle`}
                    value={selectedRecipient}
                    options={recipientOptions} 
                    isRequired={true}
                    autocomplete="list"
                    errorText={ifErrorThenGetErrorText(errors, `${EDUCATION_FORM_DATA_IDS.recipient}-input`)}
                    handleChange={handleRecipientChange}>
                </ComboBox>
                <button
                    type="button"
                    onClick={onAddRecipient}
                    className="border-none cursor-pointer underline mb-2 self-end"
                    >
                    Add a New Recipient
                </button>
            </div>
            <div className="flex flex-row gap-3 flex-wrap">
                <ComboBox
                    label="Educational Topic"
                    searchInputId={`${EDUCATION_FORM_DATA_IDS.topic}-input`}
                    listboxId={`${EDUCATION_FORM_DATA_IDS.topic}-list`}
                    buttonId={`${EDUCATION_FORM_DATA_IDS.topic}-toggle`}
                    value={selectedTopic}
                    options={topicOptions}
                    isRequired={true}
                    autocomplete="list"
                    errorText={ifErrorThenGetErrorText(errors, `${EDUCATION_FORM_DATA_IDS.topic}-input`)}
                    handleChange={handleTopicChange}>
                </ComboBox>
                <button
                    type="button"
                    onClick={onAddTopic}
                    className="border-none cursor-pointer underline mb-2 self-end"
                    >
                    Add a New Topic
                </button>
            </div>
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
            <RadioList
                label="Were there any volunteers?"
                listName={EDUCATION_FORM_DATA_IDS.hasVolunteers}
                options={JSON.stringify(HAS_VOLUNTEERS_OPTIONS)}
                isRequired={true}
                selectedValue={hasVolunteers}
                handleChange={(event: any) => setHasVolunteers(event.target.value)}>
            </RadioList>
            { hasVolunteers === 'yes' &&
                <div className="flex flex-col gap-4">
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
            }
        </div>
    );
}