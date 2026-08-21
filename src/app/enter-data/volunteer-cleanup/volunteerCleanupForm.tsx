'use client'

import { useCallback, useEffect, useState, useRef } from 'react';
import {
    AdoptASpotGroupModel,
    ErrorModel,
    GroupModel,
    ReferenceDataModel
} from '../../models';
import { ErrorSummary, RadioList } from '../../components';
import { VolunteerCleanupFormByActivity } from './volunteerCleanupFormByActivity';
import { REPORTING_DATA_TYPE_LIST_NAME, REPORTING_DATA_TYPE_OPTIONS } from './volunteerCleanupJson';
import { getAdoptASpotAssignmentOptions, getCleanupLocationOptions, getCleanupOrganizationOptions } from './actions';
import { isBlank } from '../../utils/isBlank';

export function VolunteerCleanupForm({ isUpdate, selectedDataType }: { isUpdate: boolean, selectedDataType: string }) {
    const [reportingDataType, setReportingDataType] = useState<string>(selectedDataType);
    const [errors, setErrors] = useState<Map<string, ErrorModel>>(new Map<string, ErrorModel>());
    const [adoptASpotAssignmentOptions, setAdoptASpotAssignmentOptions] = useState<AdoptASpotGroupModel[]>([]);
    const [areAdoptASpotAssignmentsRetrieved, setAreAdoptASpotAssignmentsRetrieved] = useState<boolean>(false);
    const [cleanupLocationOptions, setCleanupLocationOptions] = useState<ReferenceDataModel[]>([]);
    const [areCleanupLocationsRetrieved, setAreCleanupLocationsRetrieved] = useState<boolean>(false);
    const [cleanupOrganizationOptions, setCleanupOrganizationOptions] = useState<GroupModel[]>([]);
    const [areCleanupOrganizationsRetrieved, setAreCleanupOrganizationsRetrieved] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!areAdoptASpotAssignmentsRetrieved) {
            setAreAdoptASpotAssignmentsRetrieved(true);
            getAdoptASpotAssignmentOptions().then((assignments: string) => {
                if (!isBlank(assignments)) {
                    setAdoptASpotAssignmentOptions(JSON.parse(assignments));
                }
            });
        }

        if (!areCleanupLocationsRetrieved) {
            setAreCleanupLocationsRetrieved(true);
            getCleanupLocationOptions().then((locations: string) => {
                if (!isBlank(locations)) {
                    setCleanupLocationOptions(JSON.parse(locations));
                }
            })
        }

        if (!areCleanupOrganizationsRetrieved) {
            setAreCleanupOrganizationsRetrieved(true);
            getCleanupOrganizationOptions().then((organizations: string) => {
                if (!isBlank(organizations)) {
                    setCleanupOrganizationOptions(JSON.parse(organizations));
                }
            })
        }

        if (formRef.current) {
            formRef.current.addEventListener('keydown', (event: any) => {
                if (event.target && event.key === 'Enter' && event.target.role === 'comboBox') {
                    event.preventDefault();
                }
            });
        }
    }, [areAdoptASpotAssignmentsRetrieved, areCleanupLocationsRetrieved, areCleanupOrganizationsRetrieved]);

    // TODO: implement handleSubmit logic
    function handleSubmit(e: any) {
        e.preventDefault();
        console.log('Submitting...');
    }

    const handleReportingDataTypeChange: any = useCallback((event: any) => {
        setReportingDataType(event.target.value);
        setErrors(new Map<string, ErrorModel>());
    }, []);

    return (
        <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {(errors && errors.size >= 1) &&
                <ErrorSummary errors={JSON.stringify(Array.from(errors.values()))}></ErrorSummary>}
            <h1 id="main-content-header" className="text-xl md:text-2xl" tabIndex={-1}>
                {isUpdate ? 'Update' : 'Enter'} Data: Volunteer Cleanup Data
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
            <VolunteerCleanupFormByActivity
                activity={reportingDataType}
                adoptASpotAssignments={JSON.stringify(adoptASpotAssignmentOptions)}
                cleanupLocations={JSON.stringify(cleanupLocationOptions)}
                cleanupOrganizations={JSON.stringify(cleanupOrganizationOptions)}
                errors={errors}>
            </VolunteerCleanupFormByActivity>
            {reportingDataType !== '' &&
                <button className="border p-2 w-25 rounded-md bg-[var(--foreground)] text-[var(--background)] text-[1.06rem] mt-4 mb-4">
                    Submit
                </button>
            }
        </form>
    );
}