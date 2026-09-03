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
    CleanTeamEventModel,
    CountyCleanupEventModel,
    EventModel,
    RoadsideLitterEventModel,
    TrashRoutesEventModel
} from '../../models/event';
import {
    CleanTeamFormFields,
    CountyCleanupFormFields,
    RoadsideLitterFormFields,
    TrashRoutesFormFields
} from './formsByActivity';
import { isBlank } from '../../utils/isBlank';

export function ServicesForm({
    isUpdate, selectedDataType, onSuccessfulSubmit
}: {
    isUpdate: boolean,
    selectedDataType: string,
    onSuccessfulSubmit: (event: EventModel, reportingDataType: { code: string, label: string }) => void
}) {
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
            case (REPORTING_DATA_VALUES.cleanTeam.code):
                return (
                    <CleanTeamFormFields errors={errors}></CleanTeamFormFields>
                );
            case (REPORTING_DATA_VALUES.countyCleanup.code):
                return (
                    <CountyCleanupFormFields
                        bulkyItemsReferenceString={bulkyItemOptions}
                        errors={errors}
                        handleBulkyItemChange={handleBulkyItemChange}>
                    </CountyCleanupFormFields>
                );
            case (REPORTING_DATA_VALUES.roadsideLitter.code):
                return (
                    <RoadsideLitterFormFields
                        bulkyItemsReferenceString={bulkyItemOptions}
                        districtsReferenceString={districtOptions}
                        errors={errors}
                        handleBulkyItemChange={handleBulkyItemChange}>
                    </RoadsideLitterFormFields>
                );
            case (REPORTING_DATA_VALUES.trashRoutes.code):
                return (
                    <TrashRoutesFormFields errors={errors}></TrashRoutesFormFields>
                );
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        switch (reportingDataType) {
            case (REPORTING_DATA_VALUES.cleanTeam.code):
                const cleanResult: { isSuccessful: boolean, data: CleanTeamEventModel | null, errors: Map<string, ErrorModel> } =
                    await saveCleanTeamData(new FormData(e.target), isUpdate);
                setErrors(cleanResult.errors);
                if (cleanResult.isSuccessful && cleanResult.data) {
                    onSuccessfulSubmit(cleanResult.data, REPORTING_DATA_VALUES.cleanTeam);
                } else if (cleanResult.errors !== null && cleanResult.errors.size > 0) {
                    scrollToAndFocusErrorSummary();
                }
                break;
            case (REPORTING_DATA_VALUES.countyCleanup.code):
                const countyResult: { isSuccessful: boolean, data: CountyCleanupEventModel | null, errors: Map<string, ErrorModel> } =
                    await saveCountyCleanupData(new FormData(e.target), selectedBulkyItemValues, isUpdate);
                setErrors(countyResult.errors);
                if (countyResult.isSuccessful && countyResult.data) {
                    onSuccessfulSubmit(countyResult.data, REPORTING_DATA_VALUES.countyCleanup);
                } else if (countyResult.errors !== null && countyResult.errors.size > 0) {
                    scrollToAndFocusErrorSummary();
                }
                break;
            case (REPORTING_DATA_VALUES.roadsideLitter.code):
                const roadsideResult: { isSuccessful: boolean, data: RoadsideLitterEventModel | null, errors: Map<string, ErrorModel> } =
                    await saveRoadsideLitterData(new FormData(e.target), selectedBulkyItemValues, isUpdate);
                setErrors(roadsideResult.errors);
                if (roadsideResult.isSuccessful && roadsideResult.data) {
                    onSuccessfulSubmit(roadsideResult.data, REPORTING_DATA_VALUES.roadsideLitter);
                } else if (roadsideResult.errors !== null && roadsideResult.errors.size > 0) {
                    scrollToAndFocusErrorSummary();
                }
                break;
            case (REPORTING_DATA_VALUES.trashRoutes.code):
                const routesResult: { isSuccessful: boolean, data: TrashRoutesEventModel | null, errors: Map<string, ErrorModel> } =
                    await saveTrashRoutesData(new FormData(e.target), isUpdate);
                setErrors(routesResult.errors);
                if (routesResult.isSuccessful && routesResult.data) {
                    onSuccessfulSubmit(routesResult.data, REPORTING_DATA_VALUES.trashRoutes);
                } else if (routesResult.errors !== null && routesResult.errors.size > 0) {
                    scrollToAndFocusErrorSummary();
                }
                break;
        }
    }

    function scrollToAndFocusErrorSummary(): void {
        setTimeout(() => {
            const errorHeader = document.getElementById('error-header');
            if (errorHeader) {
                errorHeader.focus();
                window.scroll(0, 0);
            }
        }, 100);
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