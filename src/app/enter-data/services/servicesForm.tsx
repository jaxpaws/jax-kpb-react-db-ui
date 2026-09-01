'use client'

import { useState, useEffect, useCallback } from 'react';
import { ErrorSummary, RadioList } from '../../components';
import { REPORTING_DATA_TYPE_LIST_NAME, REPORTING_DATA_TYPE_OPTIONS, REPORTING_DATA_VALUES } from './servicesJson';
import {
    getBulkyItemRefData,
    getDistrictRefData,
    saveCleanTeamData,
    saveCountyCleanupData,
    saveRoadsideLitterData,
    saveTrashRoutesData
} from './actions';
import { ErrorModel } from '../../models';
import {
    CleanTeamFormFields,
    CountyCleanupFormFields,
    RoadsideLitterFormFields,
    TrashRoutesFormFields
} from './formsByActivity';
import { isBlank } from '../../utils/isBlank';

export function ServicesForm({ isUpdate, selectedDataType }: { isUpdate: boolean, selectedDataType: string }) {
    const [reportingDataType, setReportingDataType] = useState<string>(selectedDataType);
    const [errors, setErrors] = useState<Map<string, ErrorModel>>(new Map<string, ErrorModel>());
    const [hasReferenceDataBeenRequested, setHasReferenceDataBeenRequested] = useState<boolean>(false);
    const [bulkyItemOptions, setBulkyItemOptions] = useState<string>('[]');
    const [districtOptions, setDistrictOptions] = useState<string>('[]');
    const [selectedBulkyItemValues, setSelectedBulkyItemValues] = useState<string[]>([]);

    useEffect(() => {
        if (!hasReferenceDataBeenRequested) {
            setHasReferenceDataBeenRequested(true);
            getBulkyItems();
            getDistricts();
        }
    }, [hasReferenceDataBeenRequested]);

    const getBulkyItems = useCallback(() => {
        getBulkyItemRefData().then((items: string) => {
            if (!isBlank(items)) {
                setBulkyItemOptions(items);
            }
        });
    }, []);

    const getDistricts = useCallback(() => {
        getDistrictRefData().then((districts: string) => {
            if (!isBlank(districts)) {
                setDistrictOptions(districts);
            }
        });
    }, []);

    const getFormByActivity = (activity: string) => {
        switch (activity) {
            case (REPORTING_DATA_VALUES.cleanTeam):
                return (
                    <CleanTeamFormFields errors={errors}></CleanTeamFormFields>
                );
            case (REPORTING_DATA_VALUES.countyCleanup):
                return (
                    <CountyCleanupFormFields
                        bulkyItemsReferenceString={bulkyItemOptions}
                        errors={errors}
                        handleBulkyItemChange={handleBulkyItemChange}>
                    </CountyCleanupFormFields>
                );
            case (REPORTING_DATA_VALUES.roadsideLitter):
                return (
                    <RoadsideLitterFormFields
                        bulkyItemsReferenceString={bulkyItemOptions}
                        districtsReferenceString={districtOptions}
                        errors={errors}
                        handleBulkyItemChange={handleBulkyItemChange}>
                    </RoadsideLitterFormFields>
                );
            case (REPORTING_DATA_VALUES.trashRoutes):
                return (
                    <TrashRoutesFormFields errors={errors}></TrashRoutesFormFields>
                );
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        let errors: Map<string, ErrorModel> | null = null;

        switch (reportingDataType) {
            case (REPORTING_DATA_VALUES.cleanTeam):
                errors = await saveCleanTeamData(new FormData(e.target), isUpdate);
                console.log(errors);
                setErrors(errors);
                break;
            case (REPORTING_DATA_VALUES.countyCleanup):
                errors = await saveCountyCleanupData(new FormData(e.target), selectedBulkyItemValues, isUpdate);
                console.log(errors);
                setErrors(errors);
                break;
            case (REPORTING_DATA_VALUES.roadsideLitter):
                errors = await saveRoadsideLitterData(new FormData(e.target), selectedBulkyItemValues, isUpdate);
                console.log(errors);
                setErrors(errors);
                break;
            case (REPORTING_DATA_VALUES.trashRoutes):
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
            { getFormByActivity(reportingDataType) }
            {reportingDataType !== '' &&
                <button className="border p-2 w-25 rounded-md bg-[var(--foreground)] text-[var(--background)] text-[1.06rem] mt-4 mb-4">
                    Submit
                </button>
            }
        </form>
    );
}