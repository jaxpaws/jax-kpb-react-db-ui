import { EventModel } from './event.model';

export interface TreePlantingEventModel extends EventModel {
    treesPlanted: number;
    eventDescription: string;
    volunteerCount: number;
    volunteerHours: number;
}