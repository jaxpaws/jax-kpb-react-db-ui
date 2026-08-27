import { useState } from 'react';
import { RadioList, Textbox } from '../../../components';
import { ErrorModel } from '../../../models';
import { ifErrorThenGetErrorText } from '../../../utils/ifErrorThenGetErrorText';
import { BAG_SWAP_FORM_DATA_IDS, HAS_VOLUNTEERS_OPTIONS } from '../otherJson';

export function BagSwapFormFields({ errors }: { errors: Map<string, ErrorModel> }) {
    const [hasVolunteers, setHasVolunteers] = useState<string>('no');

    return (
        <div className="flex flex-col gap-4 mt-3">
            <Textbox
                inputId={BAG_SWAP_FORM_DATA_IDS.date}
                inputType="date"
                labelText="Date"
                descriptionText="Please enter the date of the bag swap event."
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, BAG_SWAP_FORM_DATA_IDS.date)}>
            </Textbox>
            <Textbox
                inputId={BAG_SWAP_FORM_DATA_IDS.bagsCollected}
                inputType="number"
                labelText="Number of Bags Collected"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, BAG_SWAP_FORM_DATA_IDS.bagsCollected)}>
            </Textbox>
            <Textbox
                inputId={BAG_SWAP_FORM_DATA_IDS.description}
                inputType="text"
                labelText="Event Description"
                descriptionText="Please enter a brief description of the bag swap event, including the location."
                width="sm:w-150"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, BAG_SWAP_FORM_DATA_IDS.description)}>
            </Textbox>
            <RadioList
                label="Were there any volunteers?"
                listName={BAG_SWAP_FORM_DATA_IDS.hasVolunteers}
                options={JSON.stringify(HAS_VOLUNTEERS_OPTIONS)}
                isRequired={true}
                selectedValue={hasVolunteers}
                handleChange={(event: any) => setHasVolunteers(event.target.value)}>
            </RadioList>
            { hasVolunteers === 'yes' &&
                <div className="flex flex-col gap-4">
                    <Textbox
                        inputId={BAG_SWAP_FORM_DATA_IDS.volunteerCount}
                        inputType="number"
                        labelText="Number of Volunteers"
                        width="sm:w-24"
                        isRequired={true}
                        errorText={ifErrorThenGetErrorText(errors, BAG_SWAP_FORM_DATA_IDS.volunteerCount)}>
                    </Textbox>
                    <Textbox
                        inputId={BAG_SWAP_FORM_DATA_IDS.volunteerHours}
                        inputType="number"
                        labelText="Volunteer Hours"
                        descriptionText="Please enter the combined volunteer hours of all volunteers at the event. Please round to the nearest quarter number (0.00, 0.25, 0.50, or 0.75)."
                        step={0.25}
                        width="sm:w-24"
                        isRequired={true}
                        errorText={ifErrorThenGetErrorText(errors, BAG_SWAP_FORM_DATA_IDS.volunteerHours)}>
                    </Textbox>
                </div>
            }
        </div>
    );
}