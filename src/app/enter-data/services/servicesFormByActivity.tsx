import { ErrorModel } from '../../models';
import {
    CleanTeamFormFields,
    CountyCleanupFormFields,
    RoadsideLitterFormFields,
    TrashRoutesFormFields
} from './formsByActivity';
import { REPORTING_DATA_VALUES } from './servicesJson';

export function ServicesFormByActivity({ activity, bulkyItemOptions, districtOptions, errors, handleBulkyItemChange

}: {
    activity: string,
    bulkyItemOptions: string,
    districtOptions: string,
    errors: Map<string, ErrorModel>,
    handleBulkyItemChange?: (event: any) => void
}): React.JSX.Element | null {
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
        
        default:
            return null;
    }
}