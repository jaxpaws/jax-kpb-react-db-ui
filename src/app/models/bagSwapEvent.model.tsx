import { EventModel } from './event.model';

export interface BagSwapEventModel extends EventModel {
    bagsCollected: number;
    eventDescription: string;
    volunteerCount: number;
    volunteerHours: number;
}