import { RoadsideLitterModel } from '../models';

export function isRoadsideLitterEvent(event: any): event is RoadsideLitterModel {
    return typeof event === 'object' && event !== null &&
        'litterPounds' in event &&
        'recyclingPounds' in event &&
        'locations' in event &&
        'districts' in event &&
        'bulkyItems' in event;
}