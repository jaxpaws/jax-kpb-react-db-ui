'use client'

import { useState, useEffect } from 'react';
import RadioList from '../../components/radioList';
import RoadsideLitterFormFields from './roadsideLitterFormFields';
import { REPORTING_DATA_TYPE_LIST_NAME, REPORTING_DATA_TYPE_OPTIONS, ROADSIDE_LITTER_FORM_DATA_IDS } from './servicesJson';
import { getBulkyItemsReference, getDistrictReference } from '../../lib/sql';
import MultiSelectOptionModel from '../../models/multiSelectOption.model';

const TAN_YELLOW_HEX = '#F4E2A3';
const GOLD_HEX = '#E4BA24';
const ROADSIDE = 'roadside';

export default function ServicesForm() {
    const [reportingDataType, setReportingDataType] = useState('');
    const [bulkyItemsOptions, setBulkyItemOptions] = useState<MultiSelectOptionModel[]>([]);
    const [districtOptions, setDistrictOptions] = useState<MultiSelectOptionModel[]>([])

    useEffect(() => {
        if (bulkyItemsOptions.length === 0) {
            let newBulkyItemOptions: MultiSelectOptionModel[] = [];
            getBulkyItemsReference()
                .then((result: any) => {
                    if (result && result.length >= 1) {
                        let itemWithHyphen: string = '';
                        result.map((row: any) => {
                            itemWithHyphen = row?.description.trim().replaceAll(' ', '-');
                            newBulkyItemOptions.push({
                                key: `${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-${itemWithHyphen}`,
                                label: row?.description,
                                inputId: `bulky-item-${itemWithHyphen}`,
                                value: row?.description
                            });
                        });
                        console.log(newBulkyItemOptions);
                        setBulkyItemOptions(newBulkyItemOptions);
                    }
                })
                .catch(error => {
                    console.error(`Error getting bulky items reference values.`)
                });
        }

        if (districtOptions.length === 0) {
            let newDistrictOptions: MultiSelectOptionModel[] = [];
            getDistrictReference()
                .then((result: any) => {
                    if (result && result.length >= 1) {
                        let itemWithHyphen: string = '';
                        result.map((row: any) => {
                            itemWithHyphen = row?.description.trim().replaceAll(' ', '-');
                            newDistrictOptions.push({
                                key: `${ROADSIDE_LITTER_FORM_DATA_IDS.bulkyItems}-${itemWithHyphen}`,
                                label: row?.description,
                                inputId: `bulky-item-${itemWithHyphen}`,
                                value: row?.description
                            });
                        });
                        console.log(newDistrictOptions);
                        setDistrictOptions(newDistrictOptions);
                    }
                })
                .catch(error => {
                    console.error(`Error getting bulky items reference values.`)
                });
        }
    }, [bulkyItemsOptions, districtOptions]);

    function handleSubmit(e: any) {
        e.preventDefault();

        const formData = new FormData(e.target);
        console.log(formData);
        console.log(`Date: ${formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.date)}`);
        console.log(`Pounds of Litter: ${formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.litterPounds)}`);
        console.log(`Pounds of Recycling: ${formData.get(ROADSIDE_LITTER_FORM_DATA_IDS.recyclingPounds)}`);
        console.log(`Districts: ${formData.getAll(ROADSIDE_LITTER_FORM_DATA_IDS.districts)}`);
    }

    return(
        <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
            <RadioList
                label="Reporting Data Type"
                listName={REPORTING_DATA_TYPE_LIST_NAME}
                options={JSON.stringify(REPORTING_DATA_TYPE_OPTIONS)}
                isRequired={true}
                selectedValue={reportingDataType}
                handleChange={(event) => setReportingDataType(event.target.value)}>
            </RadioList>
            { reportingDataType === ROADSIDE &&
                <RoadsideLitterFormFields
                    bulkyItemsReferenceString={JSON.stringify(bulkyItemsOptions)}
                    districtsReferenceString={JSON.stringify(districtOptions)}>
                </RoadsideLitterFormFields> }
            <button className="border p-2 w-25 rounded-md bg-[var(--foreground)] text-[var(--background)] text-[1.06rem] mt-4">Submit</button>
        </form>
    );
}