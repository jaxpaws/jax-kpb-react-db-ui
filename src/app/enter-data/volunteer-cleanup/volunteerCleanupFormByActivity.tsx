import { ErrorModel } from '../../models';
import { AdoptASpotFormFields, GroupCleanupFormFields } from './formsByActivity';
import { REPORTING_DATA_VALUES } from './volunteerCleanupJson';


export function VolunteerCleanupFormByActivity({ activity, adoptASpotAssignments, cleanupOrganizations, cleanupLocations, errors
}: {
    activity: string,
    adoptASpotAssignments: string,
    cleanupOrganizations: string,
    cleanupLocations: string,
    errors: Map<string, ErrorModel>
}): React.JSX.Element | null {
    switch (activity) {
        case(REPORTING_DATA_VALUES.adoptASpot):
            return (
                <AdoptASpotFormFields
                    assignmentOptions={adoptASpotAssignments}
                    errors={errors}>
                </AdoptASpotFormFields>
            );
        case(REPORTING_DATA_VALUES.groupCleanup):
            return (
                <GroupCleanupFormFields
                    locationOptions={cleanupLocations}
                    organizationOptions={cleanupOrganizations}
                    errors={errors}>
                </GroupCleanupFormFields>
            );
        default:
            return null;
    }
}