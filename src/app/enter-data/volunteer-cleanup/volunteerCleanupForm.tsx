'use client'

import { useCallback, useEffect, useState, useRef } from 'react';
import {ErrorModel } from '../../models';
import { ErrorSummary, RadioList } from '../../components';
import { VolunteerCleanupFormByActivity } from './volunteerCleanupFormByActivity';
import { REPORTING_DATA_TYPE_LIST_NAME, REPORTING_DATA_TYPE_OPTIONS, REPORTING_DATA_VALUES } from './volunteerCleanupJson';
import {
    getAdoptASpotAssignmentOptions,
    getCleanupLocationOptions,
    getCleanupOrganizationOptions,
    saveAdoptASpotAssignment,
    saveAdoptASpotData,
    saveGroupCleanupData
} from './actions';
import { isBlank } from '../../utils/isBlank';
import { ComboBoxListItemModel } from '../../components/comboBox/comboBoxListItem.model';
import { AddOptionDialog } from '../../components/dialog/addOptionDialog';
import { StatusDialog } from '../../components/dialog/statusDialog';
import { VolunteerCleanupDialogs } from './volunteerCleanupDialogs';
import { DialogType } from '../../components/dialog/dialogType.model';

export function VolunteerCleanupForm({ isUpdate, selectedDataType }: { isUpdate: boolean, selectedDataType: string }) {
    const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState<boolean>(false);
    const [isLocationDialogOpen, setIsLocationDialogOpen] = useState<boolean>(false);
    const [isOrganizationDialogOpen, setIsOrganizationDialogOpen] = useState<boolean>(false);
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false);
    const [statusDialogContent, setStatusDialogContent] = useState<{ id: string, title: string, body: React.ReactNode, type: DialogType }>(
            { id: '', title: '', body: '', type: 'info' });
    const [reportingDataType, setReportingDataType] = useState<string>(selectedDataType);
    const [errors, setErrors] = useState<Map<string, ErrorModel>>(new Map<string, ErrorModel>());

    const [adoptASpotAssignmentOptions, setAdoptASpotAssignmentOptions] = useState<string>('[]');
    const [adoptASpotAssignmentValueToIdMap, setAdoptASpotAssignmentValueToIdMap] = useState<Map<string, string>>(new Map<string, string>());
    const [areAdoptASpotAssignmentsRetrieved, setAreAdoptASpotAssignmentsRetrieved] = useState<boolean>(false);
    
    const [cleanupLocationOptions, setCleanupLocationOptions] = useState<string>('[]');
    const [areCleanupLocationsRetrieved, setAreCleanupLocationsRetrieved] = useState<boolean>(false);
    const [cleanupLocationValueToIdMap, setCleanupLocationValueToIdMap] = useState<Map<string, string>>(new Map<string, string>());

    const [cleanupOrganizationOptions, setCleanupOrganizationOptions] = useState<string>('[]');
    const [areCleanupOrganizationsRetrieved, setAreCleanupOrganizationsRetrieved] = useState<boolean>(false);
    const [cleanupOrganizationValueToIdMap, setCleanupOrganizationValueToIdMap] = useState<Map<string, string>>(new Map<string, string>());
    
    const [selectedAdoptASpot, setSelectedAdoptASpot] = useState<string>('');
    const [selectedCleanupLoc, setSelectedCleanupLoc] = useState<string>('');
    const [selectedCleanupOrg, setSelectedCleanupOrg] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!areAdoptASpotAssignmentsRetrieved) {
            setAreAdoptASpotAssignmentsRetrieved(true);
            getAssignments();
        }

        if (!areCleanupLocationsRetrieved) {
            setAreCleanupLocationsRetrieved(true);
            getLocations();
        }

        if (!areCleanupOrganizationsRetrieved) {
            setAreCleanupOrganizationsRetrieved(true);
            getOrganizations();
        }

        if (formRef.current) {
            formRef.current.addEventListener('keydown', (event: any) => {
                if (event.target && event.key === 'Enter' && event.target.role === 'comboBox') {
                    event.preventDefault();
                }
            });
        }
    }, [areAdoptASpotAssignmentsRetrieved, areCleanupLocationsRetrieved, areCleanupOrganizationsRetrieved]);

    const getAssignments: any = useCallback((onSuccessFn?: () => void) => {
        getAdoptASpotAssignmentOptions().then((assignments: string) => {
            if (!isBlank(assignments) && assignments !== '[]') {
                setAdoptASpotAssignmentOptions(JSON.parse(assignments));
                let assignmentValueToIdMap: Map<string, string> = new Map<string, string>();
                JSON.parse(assignments).map((assignment: ComboBoxListItemModel) => {
                    assignmentValueToIdMap.set(assignment.label, assignment.key);
                });
                setAdoptASpotAssignmentValueToIdMap(assignmentValueToIdMap);
                if (onSuccessFn) {
                    onSuccessFn();
                }
            }
        });
    }, []);

    const getLocations: any = useCallback((onSuccessFn?: () => void) => {
        getCleanupLocationOptions().then((locations: string) => {
            if (!isBlank(locations)) {
                setCleanupLocationOptions(JSON.parse(locations));
                let locationValueToIdMap: Map<string, string> = new Map<string, string>();
                JSON.parse(locations).map((location: ComboBoxListItemModel) => {
                    locationValueToIdMap.set(location.label, location.key);
                });
                setCleanupLocationValueToIdMap(locationValueToIdMap);
                if (onSuccessFn) {
                    onSuccessFn();
                }
            }
        });
    }, []);

    const getOrganizations: any = useCallback((onSuccessFn?: () => void) => {
        getCleanupOrganizationOptions().then((organizations: string) => {
            if (!isBlank(organizations)) {
                setCleanupOrganizationOptions(JSON.parse(organizations));
                let organizationValueToIdMap: Map<string, string> = new Map<string, string>();
                JSON.parse(organizations).map((organization: ComboBoxListItemModel) => {
                    organizationValueToIdMap.set(organization.label, organization.key);
                });
                setCleanupOrganizationValueToIdMap(organizationValueToIdMap);
                if (onSuccessFn) {
                    onSuccessFn();
                }
            }
        });
    }, []);

    const handleReportingDataTypeChange: any = useCallback((event: any) => {
        setReportingDataType(event.target.value);
        setSelectedAdoptASpot('');
        setSelectedCleanupLoc('');
        setSelectedCleanupOrg('');
        setErrors(new Map<string, ErrorModel>());
    }, []);

    async function handleSubmit(e: any) {
        e.preventDefault();
        let errors: Map<string, ErrorModel> | null = null;

        switch (reportingDataType) {
            case (REPORTING_DATA_VALUES.adoptASpot):
                const selectedSpotId: string | undefined = adoptASpotAssignmentValueToIdMap.has(selectedAdoptASpot)
                    ? adoptASpotAssignmentValueToIdMap.get(selectedAdoptASpot) : '';
                errors = await saveAdoptASpotData(
                    new FormData(e.target),
                    selectedSpotId ? selectedSpotId : '',
                    isUpdate
                );
                console.log(errors);
                setErrors(errors);
                break;
            case (REPORTING_DATA_VALUES.groupCleanup):
                const selectedOrgId: string | undefined = cleanupOrganizationValueToIdMap.has(selectedCleanupOrg)
                    ? cleanupOrganizationValueToIdMap.get(selectedCleanupOrg) : '';
                const selectedLocationId: string | undefined = cleanupLocationValueToIdMap.has(selectedCleanupLoc)
                    ? cleanupLocationValueToIdMap.get(selectedCleanupLoc) : '';
                errors = await saveGroupCleanupData(
                    new FormData(e.target),
                    selectedOrgId ? selectedOrgId : '',
                    selectedLocationId ? selectedLocationId : '',
                    isUpdate
                );
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

    function handleAddAssignment(newAssignment: string) {
        if (!isBlank(newAssignment)) {
            setIsAssignmentDialogOpen(false);
            getAssignments(() => {
                setSelectedAdoptASpot(newAssignment);
            });
        }
    }

    function handleAddLocation(newLocation: string) {
        if (!isBlank(newLocation)) {
            setIsLocationDialogOpen(false);
            getLocations(() => {
                setSelectedCleanupLoc(newLocation);
            });
        }
    }

    function handleAddOrganization(newOrganization: string) {
        if (!isBlank(newOrganization)) {
            setIsOrganizationDialogOpen(false);
            getOrganizations(() => {
                setSelectedCleanupOrg(newOrganization);
            });
        }
    }

    return (
        <div>
            <VolunteerCleanupDialogs
                isAssignmentOpen={isAssignmentDialogOpen}
                onCloseAssignment={(e: any) => setIsAssignmentDialogOpen(false)}
                onAddAssignment={handleAddAssignment}
                currentAssignmentValues={adoptASpotAssignmentValueToIdMap}
                isLocationOpen={isLocationDialogOpen}
                onCloseLocation={(e: any) => setIsLocationDialogOpen(false)}
                onAddLocation={handleAddLocation}
                currentLocationValues={cleanupLocationValueToIdMap}
                isOrganizationOpen={isOrganizationDialogOpen}
                onCloseOrganization={(e: any) => setIsOrganizationDialogOpen(false)}
                onAddOrganization={handleAddOrganization}
                currentOrganizationValues={cleanupOrganizationValueToIdMap}>
            </VolunteerCleanupDialogs>
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
                    selectedAdoptASpotAssignment={selectedAdoptASpot}
                    cleanupLocations={JSON.stringify(cleanupLocationOptions)}
                    selectedCleanupLocation={selectedCleanupLoc}
                    cleanupOrganizations={JSON.stringify(cleanupOrganizationOptions)}
                    selectedCleanupOrganization={selectedCleanupOrg}
                    errors={errors}
                    handleAdoptASpotChange={setSelectedAdoptASpot}
                    handleCleanupLocationChange={setSelectedCleanupLoc}
                    handleCleanupOrganizationChange={setSelectedCleanupOrg}
                    onAddAssignment={(e: any) => setIsAssignmentDialogOpen(true)}
                    onAddLocation={(e: any) => setIsLocationDialogOpen(true)}
                    onAddOrganization={(e: any) => setIsOrganizationDialogOpen(true)}>
                </VolunteerCleanupFormByActivity>
                {reportingDataType !== '' &&
                    <button className="border p-2 w-25 rounded-md bg-[var(--foreground)] text-[var(--background)] text-[1.06rem] mt-4 mb-4">
                        Submit
                    </button>
                }
            </form>
        </div>
    );
}