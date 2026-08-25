import { ErrorModel } from '../../models';
import { AdoptASpotFormFields, GroupCleanupFormFields } from './formsByActivity';
import { REPORTING_DATA_VALUES } from './volunteerCleanupJson';


export function VolunteerCleanupFormByActivity({
    activity,
    adoptASpotAssignments,
    cleanupOrganizations,
    cleanupLocations,
    errors,
    handleAdoptASpotChange,
    handleCleanupLocationChange,
    handleCleanupOrganizationChange
}: {
    activity: string,
    adoptASpotAssignments: string,
    cleanupOrganizations: string,
    cleanupLocations: string,
    errors: Map<string, ErrorModel>,
    handleAdoptASpotChange: (value: string) => void,
    handleCleanupLocationChange: (value: string) => void,
    handleCleanupOrganizationChange: (value: string) => void
}): React.JSX.Element | null {
    switch (activity) {
        case(REPORTING_DATA_VALUES.adoptASpot):
            return (
                <AdoptASpotFormFields
                    assignmentOptions={adoptASpotAssignments}
                    errors={errors}
                    handleSpotChange={handleAdoptASpotChange}>
                </AdoptASpotFormFields>
            );
        case(REPORTING_DATA_VALUES.groupCleanup):
            return (
                <GroupCleanupFormFields
                    locationOptions={cleanupLocations}
                    organizationOptions={cleanupOrganizations}
                    errors={errors}
                    handleLocationChange={handleCleanupLocationChange}
                    handleOrganizationChange={handleCleanupOrganizationChange}>
                </GroupCleanupFormFields>
            );
        default:
            return null;
    }
}