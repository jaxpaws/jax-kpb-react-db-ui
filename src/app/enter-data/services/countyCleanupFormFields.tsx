import { useState } from 'react';
import Textbox from '../../components/textbox';
import RadioList from '../../components/radioList';
import BulkyItems from './bulkyItems';
import { COUNTY_CLEANUP_FORM_DATA_IDS, HAS_BULKY_ITEMS_OPTIONS } from './servicesJson';

export default function CountyCleanupFormFields({ bulkyItemsReferenceString }:
    { bulkyItemsReferenceString: string }
) {
    const [hasBulkyItems, setHasBulkyItems] = useState('');
    
    return (
        <div className="flex flex-col gap-4 mt-3">
            <Textbox
                inputId={COUNTY_CLEANUP_FORM_DATA_IDS.date}
                inputType="date"
                labelText="Date"
                descriptionText="Please enter the date that the items were collected."
                isRequired={true}>
            </Textbox>
            <Textbox
                inputId={COUNTY_CLEANUP_FORM_DATA_IDS.tiresCollected}
                inputType="number"
                labelText="Number of Tires Collected"
                width="sm:w-24"
                isRequired={true}>
            </Textbox>
            <Textbox
                inputId={COUNTY_CLEANUP_FORM_DATA_IDS.cansChemicalsCollected}
                inputType="number"
                labelText="Number of Paint Can/Household Chemicals Collected"
                width="sm:w-24"
                isRequired={true}>
            </Textbox>
            <RadioList
                label="Were any bulky items collected?"
                listName={COUNTY_CLEANUP_FORM_DATA_IDS.hasBulkyItems}
                options={JSON.stringify(HAS_BULKY_ITEMS_OPTIONS)}
                isRequired={true}
                selectedValue={hasBulkyItems}
                handleChange={(event) => setHasBulkyItems(event.target.value)}>
            </RadioList>
            {  (hasBulkyItems === 'yes') &&
                <div>
                    <BulkyItems
                        bulkyItemId={COUNTY_CLEANUP_FORM_DATA_IDS.bulkyItems}
                        bulkyItemsReferenceString={bulkyItemsReferenceString}
                        isRequired={true}>
                    </BulkyItems>
                    <div className="mt-4">
                        <Textbox
                            inputId={COUNTY_CLEANUP_FORM_DATA_IDS.bulkyItemWeight}
                            inputType="number"
                            labelText="Estimated Weight of Bulky Items"
                            descriptionText="Please enter an estimate of the combined weight of the bulky items collected."
                            width="sm:w-24"
                            isRequired={true}>
                        </Textbox>
                    </div>
                </div>
            }
        </div>
    );
}