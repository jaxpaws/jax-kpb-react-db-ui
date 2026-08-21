import { ComboBox, Textbox } from '../../../components';
import { ErrorModel } from '../../../models';
import { ifErrorThenGetErrorText } from '../../../utils/ifErrorThenGetErrorText';
import { GROUP_CLEANUP_FORM_DATA_IDS } from '../volunteerCleanupJson';

export function GroupCleanupFormFields({ organizationOptions, locationOptions, errors }:
    { 
        organizationOptions: string,
        locationOptions: string,
        errors: Map<string, ErrorModel>
    }
) {
    return (
        <div className="flex flex-col gap-4 mt-3">
            <Textbox
                inputId={GROUP_CLEANUP_FORM_DATA_IDS.date}
                inputType="date"
                labelText="Date"
                descriptionText="Please enter the date of the Group Cleanup."
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, GROUP_CLEANUP_FORM_DATA_IDS.date)}>
            </Textbox>
            <ComboBox
                label="Organization"
                searchInputId={`${GROUP_CLEANUP_FORM_DATA_IDS.organization}-input`}
                listboxId={`${GROUP_CLEANUP_FORM_DATA_IDS.organization}-list`}
                buttonId={`${GROUP_CLEANUP_FORM_DATA_IDS.organization}-toggle`}
                listAriaLabel="Organizations"
                options={organizationOptions}
                isRequired={true}
                autocomplete="list"
                errorText={ifErrorThenGetErrorText(errors, `${GROUP_CLEANUP_FORM_DATA_IDS.organization}-input`)}>
            </ComboBox>
            <ComboBox
                label="Cleanup Location"
                searchInputId={`${GROUP_CLEANUP_FORM_DATA_IDS.location}-input`}
                listboxId={`${GROUP_CLEANUP_FORM_DATA_IDS.location}-list`}
                buttonId={`${GROUP_CLEANUP_FORM_DATA_IDS.location}-toggle`}
                listAriaLabel="Locations"
                options={locationOptions}
                isRequired={true}
                autocomplete="list"
                errorText={ifErrorThenGetErrorText(errors, `${GROUP_CLEANUP_FORM_DATA_IDS.location}-input`)}>
            </ComboBox>
            <Textbox
                inputId={GROUP_CLEANUP_FORM_DATA_IDS.volunteerCount}
                inputType="number"
                labelText="Number of Volunteers"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, GROUP_CLEANUP_FORM_DATA_IDS.volunteerCount)}>
            </Textbox>
            <Textbox
                inputId={GROUP_CLEANUP_FORM_DATA_IDS.volunteerHours}
                inputType="number"
                labelText="Volunteer Hours"
                descriptionText="Please enter the combined volunteer hours of all volunteers at the cleanup."
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, GROUP_CLEANUP_FORM_DATA_IDS.volunteerHours)}>
            </Textbox>
            <Textbox
                inputId={GROUP_CLEANUP_FORM_DATA_IDS.litterCollected}
                inputType="number"
                labelText="Pounds of Litter Collected"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, GROUP_CLEANUP_FORM_DATA_IDS.litterCollected)}>
            </Textbox>
            <Textbox
                inputId={GROUP_CLEANUP_FORM_DATA_IDS.recyclingCollected}
                inputType="number"
                labelText="Pounds of Recycling Collected"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, GROUP_CLEANUP_FORM_DATA_IDS.recyclingCollected)}>
            </Textbox>
        </div>
    );
}