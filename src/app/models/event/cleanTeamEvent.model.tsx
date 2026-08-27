import { EventModel } from './event.model';

export interface CleanTeamEventModel extends EventModel {
    eventDescription: string;
    trashPounds: number;
    recyclingPounds: number;
}