import { useState } from 'react';
import Textbox from '../../components/textbox';
import MultiSelect from '../../components/multiSelect';
import Textarea from '../../components/textarea';
import RadioList from '../../components/radioList';
import BulkyItems from './bulkyItems';
import { ROADSIDE_LITTER_FORM_DATA_IDS, HAS_BULKY_ITEMS_OPTIONS } from './servicesJson';

export default function RoadsideLitterFormFields({ bulkyItemsReferenceString, districtsReferenceString }:
    { bulkyItemsReferenceString: string, districtsReferenceString: string }
) {
    const [hasBulkyItems, setHasBulkyItems] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState(new Map());

    function handleChangeDistrict(event: any) {
        let copyOfDistricts: Map<string, string> = new Map(JSON.parse(JSON.stringify(Array.from(selectedDistricts))));
        if (event?.target?.checked && !copyOfDistricts.has(event.target.id)) {
            copyOfDistricts.set(event.target.id, event.target.value);
        } else {
            if (copyOfDistricts.has(event.target.id)) {
                copyOfDistricts.delete(event.target.id);
            }
        }
        setSelectedDistricts(copyOfDistricts);
    }

    return (
        <div className="flex flex-col gap-4 mt-3">
            <Textbox
                inputId={ROADSIDE_LITTER_FORM_DATA_IDS.date}
                inputType="date"
                labelText="Date"
                descriptionText="Please enter the date that the litter was collected."
                isRequired={true}>
            </Textbox>
            <Textbox
                inputId={ROADSIDE_LITTER_FORM_DATA_IDS.litterPounds}
                inputType="number"
                labelText="Pounds of Litter Collected"
                width="sm:w-24"
                isRequired={true}>
            </Textbox>
            <Textbox
                inputId={ROADSIDE_LITTER_FORM_DATA_IDS.recyclingPounds}
                inputType="number"
                labelText="Pounds of Recycling Collected"
                width="sm:w-24"
                isRequired={true}>
            </Textbox>
            <MultiSelect
                label="Districts"
                multiSelectName={ROADSIDE_LITTER_FORM_DATA_IDS.districts}
                options={districtsReferenceString}
                descriptionText="Please select all districts where litter was collected."
                isRequired={true}
                selectedValuesMap={selectedDistricts}
                handleChange={handleChangeDistrict}>
            </MultiSelect>
            <Textarea
                textareaId={ROADSIDE_LITTER_FORM_DATA_IDS.locations}
                labelText="Locations"
                descriptionText="Please enter the street locations where litter was collected. Please separate each street with a comma."
                isRequired={true}>
            </Textarea>
            <RadioList
                label="Were any bulky items collected?"
                listName={ROADSIDE_LITTER_FORM_DATA_IDS.hasBulkyItems}
                options={JSON.stringify(HAS_BULKY_ITEMS_OPTIONS)}
                isRequired={true}
                selectedValue={hasBulkyItems}
                handleChange={(event) => setHasBulkyItems(event.target.value)}>
            </RadioList>
            {  (hasBulkyItems === 'yes') &&
                <BulkyItems
                    bulkyItemId={ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}
                    bulkyItemsReferenceString={bulkyItemsReferenceString}
                    isRequired={true}>
                </BulkyItems>
            }
        </div>
    );
}