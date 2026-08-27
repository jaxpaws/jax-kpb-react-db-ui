import {
    AdoptASpotEventModel,
    BagSwapEventModel,
    CleanTeamEventModel,
    CountyCleanupEventModel,
    GroupCleanupEventModel,
    RoadsideLitterEventModel,
    TrashRoutesEventModel
} from '../models';

export function isAdoptASpotEvent(event: any): event is AdoptASpotEventModel {
    return typeof event === 'object' && event !== null &&
        'spot' in event &&
        'volunteerCount' in event &&
        'volunteerHours' in event &&
        'litterCollected' in event &&
        'recyclingCollected' in event;
}

export function isBagSwapEvent(event: any): event is BagSwapEventModel {
    return typeof event === 'object' && event !== null &&
        'bagsCollected' in event &&
        'eventDescription' in event &&
        'volunteerCount' in event &&
        'volunteerHours' in event;
}

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

export function isGroupCleanupEvent(event: any): event is GroupCleanupEventModel {
    return typeof event === 'object' && event !== null &&
        'organization' in event &&
        'location' in event &&
        'volunteerCount' in event &&
        'volunteerHours' in event &&
        'litterCollected' in event &&
        'recyclingCollected' in event;
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