import { EventModel } from './event.model';

export interface CleanTeamModel extends EventModel {
    eventDescription: string;
    trashPounds: number;
    recyclingPounds: number;
}