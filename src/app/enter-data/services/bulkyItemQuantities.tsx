import { useState, ReactElement } from 'react';
import Textbox from '../../components/textbox';

export default function BulkyItemQuantities({ event }: { event: any }) {
    const [bulkyItemQuantityInputs, setBulkyItemQuantityInputs] = useState(new Map());

    function Fields({ theFields }: { theFields: Map<string, ReactElement> }) {
        let quantityFields: React.JSX.Element[] = [];
        bulkyItemQuantityInputs.forEach((key, value) => quantityFields.push(
            <Textbox
                key={`${key}-key`}
                inputId={`${key}-quantity`}
                inputType="number"
                labelText={value}
                isRequired={true}
                labelFontWeight={400}>
            </Textbox>
        ));
        return quantityFields;
    }

    if (event) {
        let copyOfQuantityInputs: Map<string, ReactElement> = new Map(JSON.parse(JSON.stringify(Array.from(bulkyItemQuantityInputs))));
        if (event?.target?.checked && !copyOfQuantityInputs.has(event.target.id)) {
            copyOfQuantityInputs.set(event.target.id, event.target.value);
        } else {
            if (copyOfQuantityInputs.has(event.target.id)) {
                copyOfQuantityInputs.delete(event.target.id);
            }
        }
        setBulkyItemQuantityInputs(copyOfQuantityInputs);
    }

    return (
        <Fields theFields={bulkyItemQuantityInputs} />
    );
}