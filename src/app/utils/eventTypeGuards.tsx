import { CleanTeamModel, CountyCleanupModel, RoadsideLitterModel, TrashRoutesModel } from '../models';

export function isCleanTeamEvent(event: any): event is CleanTeamModel {
    return typeof event === 'object' && event !== null &&
        'eventDescription' in event &&
        'trashPounds' in event &&
        'recyclingPounds' in event;
}

export function isCountyCleanupEvent(event: any): event is CountyCleanupModel {
    return typeof event === 'object' && event !== null &&
        'tireCount' in event &&
        'paintCanAndHouseholdChemicalCount' in event &&
        'otherBulkyItems' in event &&
        'otherBulkyItemPounds' in event;
}

export function isRoadsideLitterEvent(event: any): event is RoadsideLitterModel {
    return typeof event === 'object' && event !== null &&
        'litterPounds' in event &&
        'recyclingPounds' in event &&
        'locations' in event &&
        'districts' in event &&
        'bulkyItems' in event;
}

export function isTrashRoutesEvent(event: any): event is TrashRoutesModel {
    return typeof event === 'object' && event !== null &&
        'trashPounds' in event &&
        'recyclingPounds' in event;
}