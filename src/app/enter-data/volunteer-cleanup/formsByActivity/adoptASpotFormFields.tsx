import { ComboBox, Textbox } from '../../../components';
import { ErrorModel } from '../../../models';
import { ifErrorThenGetErrorText } from '../../../utils/ifErrorThenGetErrorText';
import { ADOPT_A_SPOT_FORM_DATA_IDS } from '../volunteerCleanupJson';

export function AdoptASpotFormFields({ assignmentOptions, errors }:
    { assignmentOptions: string, errors: Map<string, ErrorModel> }
) {
    return (
        <div className="flex flex-col gap-4 mt-3">
            <Textbox
                inputId={ADOPT_A_SPOT_FORM_DATA_IDS.date}
                inputType="date"
                labelText="Date"
                descriptionText="Please enter the date of the Adopt-a-Spot cleanup."
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, ADOPT_A_SPOT_FORM_DATA_IDS.date)}>
            </Textbox>
            <ComboBox
                label="Adopted Spot"
                searchInputId={`${ADOPT_A_SPOT_FORM_DATA_IDS.spot}-input`}
                listboxId={`${ADOPT_A_SPOT_FORM_DATA_IDS.spot}-list`}
                buttonId={`${ADOPT_A_SPOT_FORM_DATA_IDS.spot}-toggle`}
                listAriaLabel="Spots"
                options={assignmentOptions}
                isRequired={true}
                autocomplete="list"
                errorText={ifErrorThenGetErrorText(errors, `${ADOPT_A_SPOT_FORM_DATA_IDS.spot}-input`)}>
            </ComboBox>
            <Textbox
                inputId={ADOPT_A_SPOT_FORM_DATA_IDS.volunteerCount}
                inputType="number"
                labelText="Number of Volunteers"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, ADOPT_A_SPOT_FORM_DATA_IDS.volunteerCount)}>
            </Textbox>
            <Textbox
                inputId={ADOPT_A_SPOT_FORM_DATA_IDS.volunteerHours}
                inputType="number"
                labelText="Volunteer Hours"
                descriptionText="Please enter the combined volunteer hours of all volunteers at the cleanup."
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, ADOPT_A_SPOT_FORM_DATA_IDS.volunteerHours)}>
            </Textbox>
            <Textbox
                inputId={ADOPT_A_SPOT_FORM_DATA_IDS.litterCollected}
                inputType="number"
                labelText="Pounds of Litter Collected"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, ADOPT_A_SPOT_FORM_DATA_IDS.litterCollected)}>
            </Textbox>
            <Textbox
                inputId={ADOPT_A_SPOT_FORM_DATA_IDS.recyclingCollected}
                inputType="number"
                labelText="Pounds of Recycling Collected"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, ADOPT_A_SPOT_FORM_DATA_IDS.recyclingCollected)}>
            </Textbox>
        </div>
    );
}