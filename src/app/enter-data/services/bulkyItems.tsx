import { useState } from 'react';
import MultiSelect from '../../components/multiSelect';
import Textbox from '../../components/textbox';

export default function BulkyItems({ bulkyItemId, bulkyItemsReferenceString, isRequired }:
    { bulkyItemId: string, bulkyItemsReferenceString: string, isRequired?: boolean }
) {
    const [bulkyItemQuantityInputs, setBulkyItemQuantityInputs] = useState(new Map());

    const BULKY_ITEMS_LABEL: string = 'Bulky Items Collected';
    const BULKY_ITEMS_DESCRIPTION: string = 'Please select each bulky item collected in the multi-select. Use the search bar to filter the bulky item options.';

    function handleChange(event: any) {
        if (event) {
            let copyOfQuantityInputs: Map<string, string> = new Map(JSON.parse(JSON.stringify(Array.from(bulkyItemQuantityInputs))));
            if (event?.target?.checked && !copyOfQuantityInputs.has(event.target.id)) {
                copyOfQuantityInputs.set(event.target.id, event.target.value);
            } else {
                if (copyOfQuantityInputs.has(event.target.id)) {
                    copyOfQuantityInputs.delete(event.target.id);
                }
            }
            setBulkyItemQuantityInputs(copyOfQuantityInputs);
        }
    }
    function getQuantityFields(theFields: Map<string, string>) {
        let quantityFields: React.JSX.Element[] = [];
        theFields.forEach((value, key) => quantityFields.push(
            <Textbox
                key={`${key}-key`}
                inputId={`${key}-quantity`}
                inputType="number"
                inputName="bulky-item-quantities"
                labelText={`${value} Quantity`}
                isRequired={true}
                labelFontWeight="font-normal"
                width="sm:w-24">
            </Textbox>
        ));
        return (
            <div>
                <fieldset>
                    <legend><p className="text-[1.06rem] font-semibold">Bulky Item Quantities</p></legend>
                    <div className="flex flex-col gap-2">
                        { quantityFields }
                    </div>
                </fieldset>
            </div>
        );
    }

    return (
        <span className="flex flex-col gap-4 mt-3">
            <MultiSelect
                label={BULKY_ITEMS_LABEL}
                multiSelectName={bulkyItemId}
                options={bulkyItemsReferenceString}
                descriptionText={BULKY_ITEMS_DESCRIPTION}
                isRequired={isRequired}
                hasSearch={true}
                orientation="grid"
                selectedValuesMap={bulkyItemQuantityInputs}
                handleChange={handleChange}>
            </MultiSelect>
            { bulkyItemQuantityInputs.size > 0 && getQuantityFields(bulkyItemQuantityInputs) }
        </span>
    );
}