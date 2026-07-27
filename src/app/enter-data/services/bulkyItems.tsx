import { useState } from 'react';
import MultiSelect from '../../components/multiSelect';
import Textbox from '../../components/textbox';

function QuantityFields({ theFields }: { theFields: Map<string, string> }) {
    let quantityFields: React.JSX.Element[] = [];
    theFields.forEach((value, key) => quantityFields.push(
        <Textbox
            key={`${key}-key`}
            inputId={`${key}-quantity`}
            inputType="number"
            labelText={`${value} Quantity`}
            isRequired={true}
            labelFontWeight={400}
            width="w-24">
        </Textbox>
    ));
    return quantityFields;
}

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
            <QuantityFields theFields={bulkyItemQuantityInputs}></QuantityFields>
        </span>
    );
}