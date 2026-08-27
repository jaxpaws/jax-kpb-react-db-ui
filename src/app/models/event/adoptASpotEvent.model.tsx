import { AdoptASpotGroupModel } from '../group/adoptASpotGroup.model';
import { EventModel } from './event.model';

export interface AdoptASpotEventModel extends EventModel {
    spot: AdoptASpotGroupModel;
    volunteerCount: number;
    volunteerHours: number;
    litterCollected: number;
    recyclingCollected: number;
}