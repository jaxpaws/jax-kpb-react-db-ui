import { Textbox } from '../../../components';
import { ErrorModel } from '../../../models';
import { ifErrorThenGetErrorText } from '../../../utils/ifErrorThenGetErrorText';
import { TREE_PLANTING_FORM_DATA_IDS } from '../otherJson';

export function TreePlantingFormFields({ errors }: { errors: Map<string, ErrorModel> }) {
    return (
        <div className="flex flex-col gap-4 mt-3">
            <Textbox
                inputId={TREE_PLANTING_FORM_DATA_IDS.date}
                inputType="date"
                labelText="Date"
                descriptionText="Please enter the date of the tree planting event."
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, TREE_PLANTING_FORM_DATA_IDS.date)}> 
            </Textbox>
            <Textbox
                inputId={TREE_PLANTING_FORM_DATA_IDS.treesPlanted}
                inputType="number"
                labelText="Number of Trees Planted"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, TREE_PLANTING_FORM_DATA_IDS.treesPlanted)}>
            </Textbox>
            <Textbox
                inputId={TREE_PLANTING_FORM_DATA_IDS.description}
                inputType="text"
                labelText="Event Description"
                descriptionText="Please enter a brief description of the tree planting event, including the location."
                width="sm:w-150"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, TREE_PLANTING_FORM_DATA_IDS.description)}>
            </Textbox>
            <Textbox
                inputId={TREE_PLANTING_FORM_DATA_IDS.volunteerCount}
                inputType="number"
                labelText="Number of Volunteers"
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, TREE_PLANTING_FORM_DATA_IDS.volunteerCount)}>
            </Textbox>
            <Textbox
                inputId={TREE_PLANTING_FORM_DATA_IDS.volunteerHours}
                inputType="number"
                labelText="Volunteer Hours"
                descriptionText="Please enter the combined volunteer hours of all volunteers at the event. Please round to the nearest quarter number (0.00, 0.25, 0.50, or 0.75)."
                step={0.25}
                width="sm:w-24"
                isRequired={true}
                errorText={ifErrorThenGetErrorText(errors, TREE_PLANTING_FORM_DATA_IDS.volunteerHours)}>
            </Textbox>
        </div>
    );
}