import { Textbox } from '../../../components';
import { ErrorModel } from '../../../models';
import { TRASH_ROUTES_FORM_DATA_IDS } from '../servicesJson';

export function TrashRoutesFormFields({ errors }: { errors: Map<string, ErrorModel> }) {
    return (
        <div className="flex flex-col gap-4 mt-3">
            <Textbox
                inputId={TRASH_ROUTES_FORM_DATA_IDS.date}
                inputType="date"
                labelText="Date"
                descriptionText="Please enter the date that the litter was collected."
                isRequired={true}>
            </Textbox>
            <Textbox
                inputId={TRASH_ROUTES_FORM_DATA_IDS.trashPounds}
                inputType="number"
                labelText="Pounds of Trash Collected"
                width="sm:w-24"
                isRequired={true}>
            </Textbox>
            <Textbox
                inputId={TRASH_ROUTES_FORM_DATA_IDS.recyclingPounds}
                inputType="number"
                labelText="Pounds of Recycling Collected"
                width="sm:w-24"
                isRequired={true}>
            </Textbox>
        </div>
    );
}