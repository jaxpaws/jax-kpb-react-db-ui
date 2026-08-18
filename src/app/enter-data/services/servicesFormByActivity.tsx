import { ErrorModel } from '../../models';
import {
    CleanTeamFormFields,
    CountyCleanupFormFields,
    RoadsideLitterFormFields,
    TrashRoutesFormFields
} from './formsByActivity';
import { REPORTING_DATA_VALUES } from './servicesJson';

export function ServicesFormByActivity({ activity, bulkyItemOptions, districtOptions, errors }:
    { activity: string, bulkyItemOptions: string, districtOptions: string, errors: Map<string, ErrorModel> }
): React.JSX.Element | null {
    switch (activity) {
        case (REPORTING_DATA_VALUES.roadsideLitter):
            console.log(`ServicesFormByActivity: ${errors}`);
            return (
                <RoadsideLitterFormFields
                    bulkyItemsReferenceString={bulkyItemOptions}
                    districtsReferenceString={districtOptions}
                    errors={errors}>
                </RoadsideLitterFormFields>
            );
        case (REPORTING_DATA_VALUES.cleanTeam):
            return (
                <CleanTeamFormFields errors={errors}></CleanTeamFormFields>
            );
        case (REPORTING_DATA_VALUES.trashRoutes):
            return (
                <TrashRoutesFormFields errors={errors}></TrashRoutesFormFields>
            );
        case (REPORTING_DATA_VALUES.countyCleanup):
            return (
                <CountyCleanupFormFields
                    bulkyItemsReferenceString={bulkyItemOptions}
                    errors={errors}>
                </CountyCleanupFormFields>
            );
        default:
            return null;
    }
}