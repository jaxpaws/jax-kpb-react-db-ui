import { CleanTeamModel, RoadsideLitterModel } from '../models';

export function isRoadsideLitterEvent(event: any): event is RoadsideLitterModel {
    return typeof event === 'object' && event !== null &&
        'litterPounds' in event &&
        'recyclingPounds' in event &&
        'locations' in event &&
        'districts' in event &&
        'bulkyItems' in event;
}

export function isCleanTeamEvent(event: any): event is CleanTeamModel {
    return typeof event === 'object' && event !== null &&
        'eventDescription' in event &&
        'trashPounds' in event &&
        'recyclingPounds' in event;
}