import { ErrorModel } from '../../models';
import { AdoptASpotFormFields, GroupCleanupFormFields } from './formsByActivity';
import { REPORTING_DATA_VALUES } from './volunteerCleanupJson';


export function VolunteerCleanupFormByActivity({
    activity,
    adoptASpotAssignments,
    selectedAdoptASpotAssignment,
    cleanupOrganizations,
    selectedCleanupOrganization,
    cleanupLocations,
    selectedCleanupLocation,
    errors,
    handleAdoptASpotChange,
    handleCleanupLocationChange,
    handleCleanupOrganizationChange,
    onAddAssignment,
    onAddLocation,
    onAddOrganization
}: {
    activity: string,
    adoptASpotAssignments: string,
    selectedAdoptASpotAssignment: string,
    cleanupOrganizations: string,
    selectedCleanupOrganization: string,
    cleanupLocations: string,
    selectedCleanupLocation: string,
    errors: Map<string, ErrorModel>,
    handleAdoptASpotChange: (value: string) => void,
    handleCleanupLocationChange: (value: string) => void,
    handleCleanupOrganizationChange: (value: string) => void,
    onAddAssignment?: (event: any) => void,
    onAddLocation?: (event: any) => void,
    onAddOrganization?: (event: any) => void
}): React.JSX.Element | null {
    switch (activity) {
        case(REPORTING_DATA_VALUES.adoptASpot):
            return (
                <AdoptASpotFormFields
                    assignmentOptions={adoptASpotAssignments}
                    selectedAssignment={selectedAdoptASpotAssignment}
                    errors={errors}
                    handleSpotChange={handleAdoptASpotChange}
                    onAddAssignment={onAddAssignment}>
                </AdoptASpotFormFields>
            );
        case(REPORTING_DATA_VALUES.groupCleanup):
            return (
                <GroupCleanupFormFields
                    locationOptions={cleanupLocations}
                    selectedLocation={selectedCleanupLocation}
                    organizationOptions={cleanupOrganizations}
                    selectedOrganization={selectedCleanupOrganization}
                    errors={errors}
                    handleLocationChange={handleCleanupLocationChange}
                    handleOrganizationChange={handleCleanupOrganizationChange}
                    onAddLocation={onAddLocation}
                    onAddOrganization={onAddOrganization}>
                </GroupCleanupFormFields>
            );
        default:
            return null;
    }
}