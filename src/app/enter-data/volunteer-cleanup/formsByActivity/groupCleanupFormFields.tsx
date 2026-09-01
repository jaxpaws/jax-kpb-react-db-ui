import { ComboBox, Textbox } from '../../../components';
import { ErrorModel } from '../../../models';
import { ifErrorThenGetErrorText } from '../../../utils/ifErrorThenGetErrorText';
import { GROUP_CLEANUP_FORM_DATA_IDS } from '../volunteerCleanupJson';

export function GroupCleanupFormFields(
{
    organizationOptions, selectedOrganization, locationOptions, selectedLocation, errors, handleLocationChange, handleOrganizationChange, onAddLocation, onAddOrganization
}: { 
    organizationOptions: string,
    selectedOrganization: string,
    locationOptions: string,
    selectedLocation: string,
    errors: Map<string, ErrorModel>,
    handleLocationChange: (value: string) => void,
    handleOrganizationChange: (value: string) => void,
    onAddLocation?: (event: any) => void,
    onAddOrganization?: (event: any) => void
}) {
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
            <div className="flex flex-row gap-3 flex-wrap">
                <ComboBox
                    label="Organization"
                    searchInputId={`${GROUP_CLEANUP_FORM_DATA_IDS.organization}-input`}
                    listboxId={`${GROUP_CLEANUP_FORM_DATA_IDS.organization}-list`}
                    buttonId={`${GROUP_CLEANUP_FORM_DATA_IDS.organization}-toggle`}
                    value={selectedOrganization}
                    listAriaLabel="Organizations"
                    options={organizationOptions}
                    isRequired={true}
                    autocomplete="list"
                    errorText={ifErrorThenGetErrorText(errors, `${GROUP_CLEANUP_FORM_DATA_IDS.organization}-input`)}
                    handleChange={handleOrganizationChange}>
                </ComboBox>
                <button
                    type="button"
                    onClick={onAddOrganization}
                    className="border-none cursor-pointer underline mb-2 self-end"
                    >
                    Add a New Organization
                </button>
            </div>
            <div className="flex flex-row gap-3 flex-wrap">
                <ComboBox
                    label="Cleanup Location"
                    searchInputId={`${GROUP_CLEANUP_FORM_DATA_IDS.location}-input`}
                    listboxId={`${GROUP_CLEANUP_FORM_DATA_IDS.location}-list`}
                    buttonId={`${GROUP_CLEANUP_FORM_DATA_IDS.location}-toggle`}
                    value={selectedLocation}
                    listAriaLabel="Locations"
                    options={locationOptions}
                    isRequired={true}
                    autocomplete="list"
                    errorText={ifErrorThenGetErrorText(errors, `${GROUP_CLEANUP_FORM_DATA_IDS.location}-input`)}
                    handleChange={handleLocationChange}>
                </ComboBox>
                <button
                    type="button"
                    onClick={onAddLocation}
                    className="border-none cursor-pointer underline mb-2 self-end"
                    >
                    Add a New Location
                </button>
            </div>
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
                step={0.25}
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