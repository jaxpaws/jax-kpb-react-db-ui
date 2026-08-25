import {
    CleanTeamEventModel,
    CountyCleanupEventModel,
    RoadsideLitterEventModel,
    TrashRoutesEventModel
} from '../models';

export function isCleanTeamEvent(event: any): event is CleanTeamEventModel {
    return typeof event === 'object' && event !== null &&
        'eventDescription' in event &&
        'trashPounds' in event &&
        'recyclingPounds' in event;
}

export function isCountyCleanupEvent(event: any): event is CountyCleanupEventModel {
    return typeof event === 'object' && event !== null &&
        'tireCount' in event &&
        'paintCanAndHouseholdChemicalCount' in event &&
        'otherBulkyItems' in event &&
        'otherBulkyItemPounds' in event;
}

export function isRoadsideLitterEvent(event: any): event is RoadsideLitterEventModel {
    return typeof event === 'object' && event !== null &&
        'litterPounds' in event &&
        'recyclingPounds' in event &&
        'locations' in event &&
        'districts' in event &&
        'bulkyItems' in event;
}

export function isTrashRoutesEvent(event: any): event is TrashRoutesEventModel {
    return typeof event === 'object' && event !== null &&
        'trashPounds' in event &&
        'recyclingPounds' in event;
}