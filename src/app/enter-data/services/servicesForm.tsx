'use client'

import { useState, useEffect, useCallback } from 'react';
import { ErrorSummary, RadioList } from '../../components';
import { REPORTING_DATA_TYPE_LIST_NAME, REPORTING_DATA_TYPE_OPTIONS, ROADSIDE_LITTER_FORM_DATA_IDS } from './servicesJson';
import {
    getBulkyItemRefData,
    getDistrictRefData,
    saveCleanTeamData,
    saveCountyCleanupData,
    saveRoadsideLitterData,
    saveTrashRoutesData
} from './actions';
import { ErrorModel, ReferenceDataModel } from '../../models';
import { MultiSelectOptionModel } from '../../components/multiSelect/multiSelectOption.model';
import { ReferenceDataDAO, DistrictReferenceDataDAO, BulkyItemReferenceDataDAO } from '../../dao/referenceData';
import { ServicesFormByActivity } from './servicesFormByActivity';
import { isBlank } from '../../utils/isBlank';

const TAN_YELLOW_HEX = '#F4E2A3';
const GOLD_HEX = '#E4BA24';
const ROADSIDE: string = 'roadside';
const CLEAN_TEAM: string = 'clean-team';
const TRASH_ROUTES: string = 'routes';
const COUNTY_CLEANUP: string = 'county-cleanup';

export function ServicesForm({ isUpdate, selectedDataType }: { isUpdate: boolean, selectedDataType: string }) {
    const [reportingDataType, setReportingDataType] = useState<string>(selectedDataType);
    const [errors, setErrors] = useState<Map<string, ErrorModel>>(new Map<string, ErrorModel>());
    const [bulkyItemOptions, setBulkyItemOptions] = useState<MultiSelectOptionModel[]>([]);
    const [areBulkyItemsRetrieved, setAreBulkyItemsRetrieved] = useState<boolean>(false);
    const [districtOptions, setDistrictOptions] = useState<MultiSelectOptionModel[]>([]);
    const [areDistrictsRetrieved, setAreDistrictsRetrieved] = useState<boolean>(false);
    const [selectedBulkyItemValues, setSelectedBulkyItemValues] = useState<string[]>([])

    useEffect(() => {
        if (!areBulkyItemsRetrieved) {
            setAreBulkyItemsRetrieved(true);
            getBulkyItemRefData().then((items: string) => {
                if (!isBlank(items)) {
                    setBulkyItemOptions(JSON.parse(items));
                }
            });
        }

        if (!areDistrictsRetrieved) {
            setAreDistrictsRetrieved(true);
            getDistrictRefData().then((districts: string) => {
                if (!isBlank(districts)) {
                    setDistrictOptions(JSON.parse(districts));
                }
            });
        }
    }, [bulkyItemOptions, districtOptions]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        let errors: Map<string, ErrorModel> | null = null;

        switch (reportingDataType) {
            case (CLEAN_TEAM):
                errors = await saveCleanTeamData(new FormData(e.target), isUpdate);
                console.log(errors);
                setErrors(errors);
                break;
            case (COUNTY_CLEANUP):
                errors = await saveCountyCleanupData(new FormData(e.target), selectedBulkyItemValues, isUpdate);
                console.log(errors);
                setErrors(errors);
                break;
            case (ROADSIDE):
                errors = await saveRoadsideLitterData(new FormData(e.target), selectedBulkyItemValues, isUpdate);
                console.log(errors);
                setErrors(errors);
                break;
            case (TRASH_ROUTES):
                errors = await saveTrashRoutesData(new FormData(e.target), isUpdate);
                console.log(errors);
                setErrors(errors);
                break;
        }

        if (errors !== null && errors.size > 0) {
            setTimeout(() => {
                const errorHeader = document.getElementById('error-header');
                if (errorHeader) {
                    errorHeader.focus();
                    window.scroll(0, 0);
                }
            }, 100);
        }

        const formData = new FormData(e.target);
        console.log(formData);
    }

    const handleReportingDataTypeChange: any = useCallback((event: any) => {
        setReportingDataType(event.target.value);
        setSelectedBulkyItemValues([]);
        setErrors(new Map<string, ErrorModel>());
    }, []);

    function handleBulkyItemChange(selectedBulkyItemValues: string[]) {
        setSelectedBulkyItemValues(selectedBulkyItemValues);
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {(errors && errors.size >= 1) &&
                <ErrorSummary errors={JSON.stringify(Array.from(errors.values()))}></ErrorSummary>}
            <h1 id="main-content-header" className="text-xl md:text-2xl" tabIndex={-1}>
                {isUpdate ? 'Update' : 'Enter'} Data: Services Data
            </h1>
            {!isUpdate &&
                <RadioList
                    label="Reporting Data Type"
                    listName={REPORTING_DATA_TYPE_LIST_NAME}
                    options={JSON.stringify(REPORTING_DATA_TYPE_OPTIONS)}
                    isRequired={true}
                    selectedValue={reportingDataType}
                    handleChange={handleReportingDataTypeChange}>
                </RadioList>
            }
            <ServicesFormByActivity
                activity={reportingDataType}
                bulkyItemOptions={JSON.stringify(bulkyItemOptions)}
                districtOptions={JSON.stringify(districtOptions)}
                errors={errors}
                handleBulkyItemChange={handleBulkyItemChange}>
            </ServicesFormByActivity>
            {reportingDataType !== '' &&
                <button className="border p-2 w-25 rounded-md bg-[var(--foreground)] text-[var(--background)] text-[1.06rem] mt-4 mb-4">
                    Submit
                </button>
            }
        </form>
    );
}